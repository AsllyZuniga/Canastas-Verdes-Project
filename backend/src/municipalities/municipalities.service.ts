import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipality } from './entities/municipality.entity';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,
  ) {}

  create(dto: CreateMunicipalityDto) {
    return this.municipalityRepo.save(this.municipalityRepo.create(dto));
  }

  findAll() {
    return this.municipalityRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const municipality = await this.municipalityRepo.findOneBy({ id });
    if (!municipality) throw new NotFoundException(`Municipality #${id} not found`);
    return municipality;
  }

  async update(id: number, dto: UpdateMunicipalityDto) {
    const municipality = await this.findOne(id);
    Object.assign(municipality, dto);
    return this.municipalityRepo.save(municipality);
  }

  async remove(id: number) {
    const municipality = await this.findOne(id);
    await this.municipalityRepo.remove(municipality);
    return { message: 'Municipality removed successfully' };
  }
}