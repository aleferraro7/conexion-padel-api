import { CreateCourtDto } from './dto/court.dto';
import { Court } from './entities/court.entity';

export interface CourtsServiceInterface {
  create(courtDto: CreateCourtDto): Promise<Court>;
  findAll(): Promise<Court[]>;
  // findOneById(id: any): Promise<Court>;
  deleteById(id: number): Promise<void>;
}
