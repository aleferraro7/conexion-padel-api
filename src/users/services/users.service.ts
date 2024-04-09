import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersService: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const existEmail = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (existEmail) {
      throw new ConflictException('The user already exists');
    }

    const existUsername = await this.usersService.findOne({
      username: createUserDto.username,
    });
    if (existUsername) {
      throw new ConflictException('The username is not available');
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
    const createdUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser._id.toString();
  }

  async findUsers(): Promise<User[]> {
    return await this.usersService.find();
  }

  async findOneById(id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return await this.usersService.findByIdAndDelete(id);
  }

  async findByEmail(email: string) {
    const user = await this.usersService.findOne({ email });
    if (user) {
      return user;
    }
    throw new Error('User not found');
  }

  async findOneByUsername(username: string): Promise<any> {
    return this.usersService.findOne({ username }).exec();
  }
}
