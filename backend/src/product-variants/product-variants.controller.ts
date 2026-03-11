import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

 
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateProductVariantDto) {
    return this.productVariantsService.create(dto);
  }

 
  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('municipalityId') municipalityId?: string,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    return this.productVariantsService.findAll(
      categoryId ? +categoryId : undefined,
      municipalityId ? +municipalityId : undefined,
      take ? +take : 10,
      skip ? +skip : 0,
    );
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productVariantsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateProductVariantDto) {
    return this.productVariantsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productVariantsService.remove(+id);
  }
}