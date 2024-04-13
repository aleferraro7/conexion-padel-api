import {
  // ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../repository/entities/user.entity';
import { Repository } from 'typeorm';
// import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly _usersRepository: Repository<User>,
  ) {}

  async getUsers() {
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
    const newUser = await this._usersRepository.create(userData);
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

//   async create(createUserData: Partial<User>): Promise<any> {
//     const existEmail = await this.usersRepository.findOneBy({
//       email: createUserData.email,
//     });
//     if (existEmail) {
//       throw new ConflictException('The user already exists');
//     }

// const existUsername = await this.usersRepository.findOneBy({
//   username: createUserData.username,
// });
// if (existUsername) {
//   throw new ConflictException('The username is not available');
// }

// const hashedPassword = await bcryptjs.hash(createUserData.password, 10);
// const newUser = new User();
// newUser.email = createUserData.email;
// newUser.password = hashedPassword;
// newUser.name = createUserData.name;
// const createdUser = await this.usersRepository.save(newUser);

// return createdUser;
//   }
