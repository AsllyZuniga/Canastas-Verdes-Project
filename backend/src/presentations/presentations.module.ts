import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './entities/presentation.entity';
import { PresentationsController } from './presentations.controller';
import { PresentationsService } from './presentations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Presentation])],
  controllers: [PresentationsController],
  providers: [PresentationsService],
  exports: [PresentationsService],
})
export class PresentationsModule {}