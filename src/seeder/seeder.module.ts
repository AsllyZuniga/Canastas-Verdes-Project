import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { Category } from '../categories/entities/category.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Presentation } from '../presentations/entities/presentation.entity';
import { ProductVariant } from '../product-variants/entities/product-variant.entity';
import { Transaction, TransactionContents } from '../transactions/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Category,
      Municipality,
      User,
      Product,
      Presentation,
      ProductVariant,
      Transaction,
      TransactionContents,
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}