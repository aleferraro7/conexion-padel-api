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
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  @Get()
  async findAll() {
    return await this.userService.getUsers();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
