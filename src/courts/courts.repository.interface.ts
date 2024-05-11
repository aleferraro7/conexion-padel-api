import { BaseInterfaceRepository } from 'src/base/base.interface.repository';
import { Court } from './entities/court.entity';

export interface CourtsRepositoryInterface
  extends BaseInterfaceRepository<Court> {
  findOneById(id: number): Promise<Court>;
}
