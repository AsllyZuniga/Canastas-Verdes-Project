import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  costPcc: number;

  @IsNumber()
  @Min(0)
  logisticsCost: number;

  @IsNumber()
  @Min(0)
  transportCost: number;

  @IsNumber()
  @Min(0)
  suggestedPrice: number;

  @IsNumber()
  @Min(0)
  salePrice: number;

  @IsNumber()
  @Min(0)
  inventory: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  municipalityId: number;

  @IsNumber()
  presentationId: number;
}