import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Room } from './entities/room.entity';
import { RoomsRepository } from './rooms.repository';
import { UsersRepository } from 'src/users/repository/users.repository';
import { CreateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomsService extends BaseService<Room> {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly usersRepository: UsersRepository,
  ) {
    super(roomsRepository);
  }

  async createRoom(userId: number, data: CreateRoomDto): Promise<Room> {
    const user = await this.usersRepository.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const createdRoom = await this.roomsRepository.create(data);

    return await this.roomsRepository.save(createdRoom);
  }

  async joinRoom(userId: number, roomId: number): Promise<Room> {
    const room = await this.roomsRepository.findOneById(roomId);
    const user = await this.usersRepository.findOneById(userId);

    if (!room) {
      throw new Error('Room not found');
    }
    if (!user) {
      throw new Error('User not found');
    }
    if (room.users.length >= 4) {
      throw new Error('Room is full');
    }

    room.users.push(user);
    return this.roomsRepository.save(room);
  }
}
