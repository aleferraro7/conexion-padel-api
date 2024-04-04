import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
// import { CreateUserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.dto';
// import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/auth/guard/role.guard';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import { Role } from 'src/common/enums/role.enum';

@ApiTags('USERS')
@Controller('users')
// @UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RoleGuard(Role.USER))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.create(createUserDto);
  // }

  @Get()
  async findAll() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
