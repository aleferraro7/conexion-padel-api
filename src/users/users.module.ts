import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/entities/user.entity';
import { UsersService } from './services/users.service';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          dest: './my-file',
          minLength: 4096,
          sync: false,
        }),
        messageKey: 'message',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
