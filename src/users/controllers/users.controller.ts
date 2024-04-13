import {
  Body,
  Controller,
  Delete,
  Get,
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
  constructor(private readonly _usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.createUser(createUserDto);
  }
  @Get()
  async findAll() {
    return await this._usersService.getUsers();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this._usersService.getUserById(id);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this._usersService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this._usersService.deleteUser(id);
  }
}
