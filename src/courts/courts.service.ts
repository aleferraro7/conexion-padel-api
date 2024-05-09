import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Court } from './entities/court.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { CourtsRepository } from './courts.repository';
import { CourtsRepositoryInterface } from './courts.repository.interface';
import { CourtDto } from './dto/court.dto';
import { CourtsServiceInterface } from './courts.service.interface';

@Injectable()
export class CourtsService implements CourtsServiceInterface {
  constructor(
    @Inject('CourtsRepositoryInterface')
    private readonly courtsRepository: CourtsRepositoryInterface,
  ) {}

  async create(courtDto: CourtDto): Promise<Court> {
    const court = new Court();
    court.number = courtDto.number;
    return this.courtsRepository.create(court);
  }

  async findAll(): Promise<Court[]> {
    return await this.courtsRepository.findAll();
  }

  // async findOneById(id: number): Promise<Court> {
  //   return await this.courtsRepository.findOneById(id);
  // }

  async deleteById(id: number): Promise<void> {
    await this.courtsRepository.deleteById(id);
  }
}

// @Injectable()
// export class CourtsService {
//   constructor(
//     @InjectRepository(Court)
//     private readonly _courtsRepository: Repository<Court>,
//   ) {}

//   async getCourts(): Promise<Court[]> {
//     return await this._courtsRepository.find();
//   }

//   async getCourtById(id: number) {
//     const court = await this._courtsRepository.findBy({ id });
//     if (court) {
//       return court;
//     }
//     throw new HttpException(
//       'Court with this id does not exists',
//       HttpStatus.NOT_FOUND,
//     );
//   }

//   async createCourt(courtData: Partial<Court>) {
//     const newCourt = await this._courtsRepository.create(courtData);
//     await this._courtsRepository.save(newCourt);
//     return newCourt;
//   }

//   async updateCourt(id: number, updateCourt: Partial<Court>) {
//     await this._courtsRepository.update(id, updateCourt);
//     const updatedCourt = await this.getCourtById(id);
//     if (updatedCourt) {
//       return updatedCourt;
//     }
//     throw new HttpException('Court not found', HttpStatus.NOT_FOUND);
//   }

//   async deleteCourt(id: number) {
//     const deleteResponse = await this._courtsRepository.delete(id);
//     if (!deleteResponse.affected) {
//       throw new HttpException('Court not found', HttpStatus.NOT_FOUND);
//     }
//   }
// }
