import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Category } from '../../categories/entities/category.entity';
import { Municipality } from '../../municipalities/entities/municipality.entity';
import { Presentation } from '../../presentations/entities/presentation.entity';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  sku: string;

  // Campos de costo — solo admin los ve
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPcc: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  logisticsCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  transportCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  suggestedPrice: number;

  // Precio que ve el cliente
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salePrice: number;

  @Column({ type: 'int', default: 0 })
  inventory: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => Product, (product) => product.variants, { eager: true })
  @JoinColumn({ name: 'productId' })
  
  product: Product;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Municipality, (m) => m.variants, { eager: true })
  @JoinColumn({ name: 'municipalityId' })
  municipality: Municipality;

  @ManyToOne(() => Presentation, (p) => p.variants, { eager: true })
  @JoinColumn({ name: 'presentationId' })
  presentation: Presentation;
}