import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Room } from './entities/room.entity';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService extends BaseService<Room> {
  constructor(private readonly roomsRepository: RoomsRepository) {
    super(roomsRepository);
  }

  // async joinRoom(userId: number, roomId: number): Promise<Room> {
  //   const room = await this.roomsRepository.findOneById(roomId);
  //   const userAdd = await this.usersRepository.findOneById(user);

  //   if (!room) {
  //     throw new Error('Room not found');
  //   }

  //   if (!userAdd) {
  //     throw new Error('Aca falla');
  //   }

  //   // if (room.users.length >= 4) {
  //   //   throw new Error('Room is full');
  //   // }

  //   const joinedRoom = await this.roomsRepository.save({
  //     ...room,
  //     users: [userAdd],
  //   });

  //   return joinedRoom;
  // }
}
