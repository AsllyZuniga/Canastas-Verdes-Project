import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Category } from '../categories/entities/category.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { User, UserRole } from '../users/entities/user.entity';

const categories = [
  { name: 'Autocuidado' }, { name: 'Verduras' }, { name: 'Sazonadores' },
  { name: 'Frutas' }, { name: 'Snacks' }, { name: 'Postres' },
  { name: 'Aromáticas' }, { name: 'Café' }, { name: 'Lácteos' },
  { name: 'Legumbres' }, { name: 'Proteínas' }, { name: 'Adicionales' },
  { name: 'Productos de Temporada' }, { name: 'Hongo Comestibles' }, { name: 'Tubérculo' },
];

const municipalities = [
  { code: 'Y', name: 'Yacuanquer' },
  { code: 'G', name: 'Gualmatán' },
  { code: 'C', name: 'Consacá' },
  { code: 'F', name: 'La Florida' },
  { code: 'A', name: 'Ancuya' },
  { code: 'S', name: 'Sandoná' },
];

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }

  async seed() {
    console.log('Iniciando seed...');

    await this.categoryRepo.save(categories);
    console.log(`${categories.length} categorías`);

    await this.municipalityRepo.save(municipalities);
    console.log(`${municipalities.length} municipios`);

    await this.userRepo.save([
      {
        name: 'Administrador',
        email: 'admin@canastasverdes.com',
        password: await bcrypt.hash('admin123', 10),
        role: UserRole.ADMIN,
      },
      {
        name: 'Cliente Demo',
        email: 'cliente@gmail.com',
        password: await bcrypt.hash('cliente123', 10),
        role: UserRole.CLIENT,
      },
    ]);
    console.log('2 usuarios de prueba');
    console.log('Seed listo. Los productos se crean desde el frontend.');
  }
}