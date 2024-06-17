import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
// import { PinoLogger } from 'nestjs-pino';
import { USER_PAGINATE_CONFIG, User } from '../repository/entities/user.entity';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
} from 'nestjs-paginate';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    // private readonly logger: PinoLogger,
  ) {
    // this.logger.setContext(UsersController.name);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._usersService.register(createUserDto);
  }

  @Get()
  @ApiOkPaginatedResponse(User, USER_PAGINATE_CONFIG)
  @ApiPaginationQuery(USER_PAGINATE_CONFIG)
  async findAll(@Paginate() query: PaginateQuery) {
    // this.logger.info('Finding all users');
    return await this._usersService.findAll(query);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this._usersService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this._usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this._usersService.deleteById(id);
  }
}
