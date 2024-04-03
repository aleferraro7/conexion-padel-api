import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersService: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.usersService(createUserDto);
    return await newUser.save();
  }

  async findUsers() {
    return await this.usersService.find();
  }

  async findOneById(id: string) {
    return await this.usersService.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersService.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersService.findByIdAndDelete(id);
  }

  async findOneByEmail(email: string) {
    return await this.usersService.findOne({ email });
  }

  async findByEmailWithPassword(email) {
    return this.usersService.findOne({
      where: { email },
      select: ['id', 'email', 'role', 'name', 'password'],
    });
  }
}
