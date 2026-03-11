import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presentation } from './entities/presentation.entity';
import { CreatePresentationDto } from './dto/create-presentation.dto';

@Injectable()
export class PresentationsService {
  constructor(
    @InjectRepository(Presentation)
    private readonly presentationRepo: Repository<Presentation>,
  ) {}

  create(dto: CreatePresentationDto) {
    return this.presentationRepo.save(this.presentationRepo.create(dto));
  }

  findAll() {
    return this.presentationRepo.find({ order: { description: 'ASC' } });
  }

  async findOne(id: number) {
    const presentation = await this.presentationRepo.findOneBy({ id });
    if (!presentation) throw new NotFoundException(`Presentation #${id} not found`);
    return presentation;
  }

  async remove(id: number) {
    const presentation = await this.findOne(id);
    await this.presentationRepo.remove(presentation);
    return { message: 'Presentation removed successfully' };
  }
}