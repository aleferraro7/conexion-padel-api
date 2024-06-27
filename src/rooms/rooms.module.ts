import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/users/repository/entities/user.entity';
import { RoomsRepository } from './rooms.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, UsersRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
