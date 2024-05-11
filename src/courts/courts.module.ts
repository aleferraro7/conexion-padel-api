import { Module } from '@nestjs/common';
// import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { CourtsRepository } from './courts.repository';
import { CourtsService } from './courts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Court])],
  controllers: [CourtsController],
  // providers: [CourtsService],
  providers: [
    {
      provide: 'CourtsRepositoryInterface',
      useClass: CourtsRepository,
    },
    {
      provide: 'CourtsServiceInterface',
      useClass: CourtsService,
    },
    CourtsService,
  ],
})
export class CourtsModule {}
