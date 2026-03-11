import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';

@Entity()
export class Presentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  description: string; // Ej: "1 onz", "500gr", "Atado", "Kilo"

  @OneToMany(() => ProductVariant, (variant) => variant.presentation)
  variants: ProductVariant[];
}