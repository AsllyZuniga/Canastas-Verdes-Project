import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { ProductVariant } from '../product-variants/entities/product-variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionContents, ProductVariant]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}