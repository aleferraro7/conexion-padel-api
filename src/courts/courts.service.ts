import { Injectable } from '@nestjs/common';
import { Court } from './entities/court.entity';
import { BaseService } from 'src/base/base.service';
import { CourtsRepository } from './courts.repository';

@Injectable()
export class CourtsService extends BaseService<Court> {
  constructor(private readonly courtsRepository: CourtsRepository) {
    super(courtsRepository);
  }
}
