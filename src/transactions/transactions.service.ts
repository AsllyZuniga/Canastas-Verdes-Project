import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TransactionContents,
  Transaction,
} from './entities/transaction.entity';
import { Product } from 'src/products/entities/product.entity';

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
        const transaction = transactionEntityManager.create(Transaction, {
          total: createTransactionDto.total,
        });

        await transactionEntityManager.save(transaction);

        for (const contents of createTransactionDto.contents) {
          const product = await transactionEntityManager.findOne(Product, {
            where: { id: contents.productId },
          });

          if (!product) {
            throw new BadRequestException(
              `Product with id ${contents.productId} not found`,
            );
          }

          if (contents.quantity > product.inventory) {
            throw new BadRequestException(
              `The article ${product.name} is not available`,
            );
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
  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
