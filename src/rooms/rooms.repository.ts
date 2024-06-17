import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from 'src/base/base.abstract.repository';
import { ROOM_PAGINATE_CONFIG, Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsRepository extends BaseAbstractRepository<Room> {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {
    super(roomsRepository, ROOM_PAGINATE_CONFIG);
  }
}
