// import { BaseRepository } from 'src/base/base.repository';
import { Court } from './entities/court.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/base/base.abstract.repository';
import { CourtsRepositoryInterface } from './courts.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourtsRepository
  extends BaseAbstractRepository<Court>
  implements CourtsRepositoryInterface
{
  constructor(
    @InjectRepository(Court)
    private readonly courtsRepository: Repository<Court>,
  ) {
    super(courtsRepository);
  }
}
