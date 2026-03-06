import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,
  ) {}

async create(dto: CreateProductVariantDto) {
  const variant = new ProductVariant();
  variant.sku = dto.sku;
  variant.costPcc = dto.costPcc;
  variant.logisticsCost = dto.logisticsCost;
  variant.transportCost = dto.transportCost;
  variant.suggestedPrice = dto.suggestedPrice;
  variant.salePrice = dto.salePrice;
  variant.inventory = dto.inventory;
  variant.product = { id: dto.productId } as any;
  variant.category = { id: dto.categoryId } as any;
  variant.municipality = { id: dto.municipalityId } as any;
  variant.presentation = { id: dto.presentationId } as any;

  return this.variantRepo.save(variant);
}

  async findAll(categoryId?: number, municipalityId?: number, take = 10, skip = 0) {
    const options: FindManyOptions<ProductVariant> = {
      take,
      skip,
      order: { createdAt: 'DESC' },
    };

    const where: any = {};
    if (categoryId) where.category = { id: categoryId };
    if (municipalityId) where.municipality = { id: municipalityId };
    if (Object.keys(where).length) options.where = where;

    const [variants, total] = await this.variantRepo.findAndCount(options);
    return { variants, total };
  }

  async findOne(id: number) {
    const variant = await this.variantRepo.findOneBy({ id });
    if (!variant) throw new NotFoundException(`ProductVariant #${id} not found`);
    return variant;
  }

  async update(id: number, dto: UpdateProductVariantDto) {
    const variant = await this.findOne(id);
    if (dto.productId) variant.product = { id: dto.productId } as any;
    if (dto.categoryId) variant.category = { id: dto.categoryId } as any;
    if (dto.municipalityId) variant.municipality = { id: dto.municipalityId } as any;
    if (dto.presentationId) variant.presentation = { id: dto.presentationId } as any;
    Object.assign(variant, {
      sku: dto.sku ?? variant.sku,
      costPcc: dto.costPcc ?? variant.costPcc,
      logisticsCost: dto.logisticsCost ?? variant.logisticsCost,
      transportCost: dto.transportCost ?? variant.transportCost,
      suggestedPrice: dto.suggestedPrice ?? variant.suggestedPrice,
      salePrice: dto.salePrice ?? variant.salePrice,
      inventory: dto.inventory ?? variant.inventory,
    });
    return this.variantRepo.save(variant);
  }

  async remove(id: number) {
    const variant = await this.findOne(id);
    await this.variantRepo.remove(variant);
    return { message: 'ProductVariant removed successfully' };
  }
}