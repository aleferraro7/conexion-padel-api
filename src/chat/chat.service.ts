import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service.';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/repository/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messagesRepository.create({
      content,
      author,
    });
    await this.messagesRepository.save(newMessage);

    return newMessage;
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Auth: authToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthToken(authToken);

    if (!user) {
      throw new WsException('Invalid credentials');
    }

    return user;
  }
}
