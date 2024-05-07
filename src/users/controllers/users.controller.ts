import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user ${createUserDto.email}`);
    return await this._usersService.createUser(createUserDto);
  }
  @Get()
  async findAll() {
    this.logger.log('finding all the users');
    return await this._usersService.getUsers();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`finding user with id number ${id}`);
    return await this._usersService.getUserById(id);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`updating user with id number ${id}`);
    return await this._usersService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.logger.log(`Deleting user with id number ${id}`);
    return await this._usersService.deleteUser(id);
  }
}
