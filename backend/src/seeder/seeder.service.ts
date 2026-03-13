import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import { Category } from '../categories/entities/category.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../product-variants/entities/product-variant.entity';
import { Presentation } from '../presentations/entities/presentation.entity';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductVariant)
    private readonly variantRepo: Repository<ProductVariant>,

    @InjectRepository(Presentation)
    private readonly presentationRepo: Repository<Presentation>,

    private readonly dataSource: DataSource,
  ) {}

  // Se ejecuta automaticamente al cargar el modulo
  // Borra y recrea la BD limpia — solo usar en desarrollo
  async onModuleInit() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }

  private loadData() {
    const filePath = path.join(__dirname, 'data', 'initial-data.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }

  private async findOrCreateCategory(name: string): Promise<Category> {
    const existing = await this.categoryRepo.findOneBy({ name });
    if (existing) return existing;
    return this.categoryRepo.save(this.categoryRepo.create({ name }));
  }

  private async findOrCreateMunicipality(name: string, code: string): Promise<Municipality> {
    const existing = await this.municipalityRepo.findOneBy({ name });
    if (existing) return existing;
    return this.municipalityRepo.save(this.municipalityRepo.create({ name, code }));
  }

  private async findOrCreatePresentation(description: string): Promise<Presentation> {
    const existing = await this.presentationRepo.findOneBy({ description });
    if (existing) return existing;
    return this.presentationRepo.save(this.presentationRepo.create({ description }));
  }

  private async findOrCreateProduct(name: string): Promise<Product> {
    const existing = await this.productRepo.findOneBy({ name });
    if (existing) return existing;
    return this.productRepo.save(this.productRepo.create({ name }));
  }

  async seed() {
    const data = this.loadData();

    console.log('Iniciando seed desde initial-data.json...');
    console.log('─────────────────────────────────────────');

    // ── 1. Categorías ──────────────────────────────────────────────────────
    for (const cat of data.categories) {
      await this.findOrCreateCategory(cat.name);
    }
    console.log(`✅ ${data.categories.length} categorías`);

    // ── 2. Municipios ──────────────────────────────────────────────────────
    for (const mun of data.municipalities) {
      await this.findOrCreateMunicipality(mun.name, mun.code);
    }
    console.log(`✅ ${data.municipalities.length} municipios`);

    // ── 3. Usuarios ────────────────────────────────────────────────────────
    for (const usr of data.users) {
      const exists = await this.userRepo.findOneBy({ email: usr.email });
      if (!exists) {
        await this.userRepo.save({
          name: usr.name,
          email: usr.email,
          password: await bcrypt.hash(usr.password, 10),
          role: usr.role as UserRole,
        });
      }
    }
    console.log(`✅ ${data.users.length} usuarios`);

    // ── 4. Productos y variantes ───────────────────────────────────────────
    let creados = 0;
    let omitidos = 0;

    for (const row of data.products) {
      // Si el SKU ya existe lo omitimos
      const exists = await this.variantRepo.findOneBy({ sku: row.sku });
      if (exists) {
        omitidos++;
        continue;
      }

      // Busca categoria y municipio por nombre — nunca por ID
      const category = await this.categoryRepo.findOneBy({
        name: row.categoria,
      });
      const municipality = await this.municipalityRepo.findOneBy({
        name: row.municipio,
      });

      if (!category) {
        console.log(`❌ Categoría no encontrada: "${row.categoria}" (${row.sku})`);
        continue;
      }
      if (!municipality) {
        console.log(`❌ Municipio no encontrado: "${row.municipio}" (${row.sku})`);
        continue;
      }

      const presentation = await this.findOrCreatePresentation(row.presentacion);
      const product = await this.findOrCreateProduct(row.producto.trim());

      // Crea la variante
      const variant = new ProductVariant();
      variant.sku            = row.sku;
      variant.costPcc        = row.costPcc;
      variant.logisticsCost  = row.logisticsCost;
      variant.transportCost  = row.transportCost;
      variant.suggestedPrice = row.suggestedPrice;
      variant.salePrice      = row.salePrice;
      variant.inventory      = row.inventory;
      variant.product        = product;
      variant.category       = category;
      variant.municipality   = municipality;
      variant.presentation   = presentation;

      await this.variantRepo.save(variant);
      creados++;
    }

    console.log(`✅ ${creados} variantes creadas`);
    if (omitidos > 0) console.log(`⏭  ${omitidos} variantes omitidas (ya existían)`);
    console.log('─────────────────────────────────────────');
    console.log('🎉 Seed completado.');
  }
}