import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name not valid' })
  name: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price not valid' })
  price: number;

  @IsNotEmpty({ message: 'Inventory is required' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Inventory not valid' })
  inventory: number;

  @IsNotEmpty({ message: 'Category is required' })
  @IsInt({ message: 'Category not valid' })
  categoryId: number;
}
