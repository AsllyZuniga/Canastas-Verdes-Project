import { IsNumberString, IsOptional } from 'class-validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsNumberString({}, { message: 'Category must be a number' })
  category_id: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Cantidad must be a number' })
  take: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Cantidad must be a number' })
  skip: number;
}
