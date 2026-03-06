import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { TransactionContents, Transaction, OrderStatus } from './entities/transaction.entity';
import { ProductVariant } from '../product-variants/entities/product-variant.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,

    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
  ) {}

  private async generateOrderNumber(): Promise<string> {
    const count = await this.transactionRepository.count();
    return `ORD-${String(count + 1).padStart(3, '0')}`;
  }

  async create(createTransactionDto: CreateTransactionDto, userId?: number) {
    await this.variantRepository.manager.transaction(
      async (entityManager) => {
        const transaction = new Transaction();
        transaction.orderNumber = await this.generateOrderNumber();
        transaction.status = OrderStatus.PENDING;

        if (userId) {
          transaction.user = { id: userId } as any;
        }

        transaction.total = createTransactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );

        await entityManager.save(transaction);

        for (const item of createTransactionDto.contents) {
          const variant = await entityManager.findOne(ProductVariant, {
            where: { id: item.productVariantId },
          });

          if (!variant) {
            throw new BadRequestException(
              `ProductVariant #${item.productVariantId} not found`,
            );
          }

          if (item.quantity > variant.inventory) {
            throw new BadRequestException(
              `${variant.product.name} no tiene suficiente inventario`,
            );
          }

          variant.inventory -= item.quantity;
          await entityManager.save(variant);

          const content = entityManager.create(TransactionContents, {
            price: item.price,
            quantity: item.quantity,
            transaction,
            product: variant,
          });

          await entityManager.save(content);
        }
      },
    );

    return { message: 'Order created successfully' };
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: { contents: true, user: true },
      order: { transactionDate: 'DESC' },
    };

    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) throw new BadRequestException('Invalid date format');
      options.where = {
        transactionDate: Between(startOfDay(date), endOfDay(date)),
      };
    }

    return this.transactionRepository.find(options);
  }

  findMyOrders(userId: number) {
    return this.transactionRepository.find({
      where: { user: { id: userId } },
      relations: { contents: true },
      order: { transactionDate: 'DESC' },
    });
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: { contents: true, user: true },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async updateStatus(id: number, status: OrderStatus) {
    const transaction = await this.findOne(id);
    transaction.status = status;
    return this.transactionRepository.save(transaction);
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const content of transaction.contents) {
      const variant = await this.variantRepository.findOneBy({
        id: content.product.id,
      });
      if (variant) {
        variant.inventory += content.quantity;
        await this.variantRepository.save(variant);
      }
      await this.transactionContentsRepository.remove(content);
    }

    await this.transactionRepository.remove(transaction);
    return { message: 'Order deleted successfully' };
  }
}