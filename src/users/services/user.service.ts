import {
  // ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
// import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
// import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this._userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this._userRepository.findBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(userDto: Partial<User>) {
    const newUser = await this._userRepository.create(userDto);
    await this._userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, updateUser: Partial<User>) {
    await this._userRepository.update(id, updateUser);
    const updatedUser = await this.getUserById(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const deleteResponse = await this._userRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string) {
    const user = await this._userRepository.findOneBy({ email });
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
