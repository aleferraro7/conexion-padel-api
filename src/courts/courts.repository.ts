import { BaseRepository } from 'src/base/base.repository';
import { Court } from './entities/court.entity';
import { IRepository } from 'src/base/irepository';
import { Repository } from 'typeorm';

export class CourtsRepository
  extends BaseRepository<Court>
  implements IRepository<Court>
{
  constructor(repository: Repository<Court>) {
    super(repository);
  }
}
