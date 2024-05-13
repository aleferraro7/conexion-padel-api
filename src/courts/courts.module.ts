import { Module } from '@nestjs/common';
import { CourtsController } from './courts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { CourtsRepository } from './courts.repository';
import { CourtsService } from './courts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Court])],
  controllers: [CourtsController],
  providers: [CourtsService, CourtsRepository],
})
export class CourtsModule {}
