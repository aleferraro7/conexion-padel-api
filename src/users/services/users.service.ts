import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new BadRequestException('The user already exists');
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.password, 10);
    // const createdUser = await this.usersService.create({
    await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    // createdUser.password = undefined;

    return `Welcome ${createUserDto.username} to Padel Connection`;
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

  async findByEmailWithPassword(email): Promise<User> {
    return this.usersService.findOne({
      where: { email },
      select: ['id', 'email', 'role', 'name', 'password'],
    });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.usersService.findOne({ username });
  }
}
