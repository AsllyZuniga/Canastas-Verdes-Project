import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import {
  TransactionContents,
  Transaction,
} from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        const transaction = new Transaction();

        transaction.total = createTransactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );

        await transactionEntityManager.save(transaction);

        for (const contents of createTransactionDto.contents) {
          const product = await transactionEntityManager.findOne(Product, {
            where: { id: contents.productId },
          });

          const errors: string[] = [];

          if (!product) {
            errors.push(`Product with id ${contents.productId} not found`);
            throw new BadRequestException(errors);
          }

          if (contents.quantity > product.inventory) {
            errors.push(`The article ${product.name} is not available`);
            throw new BadRequestException(errors);
          }

          product.inventory -= contents.quantity;
          await transactionEntityManager.save(product);

          const transactionContent = transactionEntityManager.create(
            TransactionContents,
            {
              price: contents.price,
              quantity: contents.quantity,
              transaction,
              product,
            },
          );

          await transactionEntityManager.save(transactionContent);
        }
      },
    );

    return 'Sale created successfully';
  }

  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    };
    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid(date)) {
        throw new BadRequestException('Invalid date format');
      }
      const start = startOfDay(date);
      const end = endOfDay(date);

      options.where = {
        transactionDate: Between(start, end),
      };
    }
    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        contents: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({
        id: contents.product.id,
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      product.inventory += contents.quantity;
      await this.productRepository.save(product);

      await this.transactionContentsRepository.remove(contents);
    }

    await this.transactionRepository.remove(transaction);

    return { message: 'Sale deleted successfully' };
  }
}
