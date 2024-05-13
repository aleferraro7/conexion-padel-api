import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../repository/entities/user.entity';
import { Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
// import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async getUsers(): Promise<User[]> {
    return await this._usersRepository.find();
  }

  async getUserById(id: number) {
    const user = await this._usersRepository.findBy({ id });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exists',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: Partial<User>) {
    const newUser = this._usersRepository.create(userData);
    await this._usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUser: Partial<User>) {
    await this._usersRepository.update(id, updateUser);
    const updatedUser = await this.getUserById(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this._usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string) {
    const user = await this._usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exists',
      HttpStatus.NOT_FOUND,
    );
  }
}
