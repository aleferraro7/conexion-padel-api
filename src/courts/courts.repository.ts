// import { BaseRepository } from 'src/base/base.repository';
import { Court } from './entities/court.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/base/base.abstract.repository';
// import { CourtsRepositoryInterface } from './courts.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
// implements CourtsRepositoryInterface
export class CourtsRepository extends BaseAbstractRepository<Court> {
  constructor(
    @InjectRepository(Court)
    private readonly courtsRepository: Repository<Court>,
  ) {
    super(courtsRepository);
  }

  // public async findOneById(id: number): Promise<Court> {
  //   return await this.courtsRepository.findOneBy({ id });
  // }
}
