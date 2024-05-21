import { Court, COURT_PAGINATE_CONFIG } from './entities/court.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourtsRepository extends BaseAbstractRepository<Court> {
  constructor(
    @InjectRepository(Court)
    private readonly courtsRepository: Repository<Court>,
  ) {
    super(courtsRepository, COURT_PAGINATE_CONFIG);
  }
}
