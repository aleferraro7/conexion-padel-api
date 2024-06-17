import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { ROOM_PAGINATE_CONFIG, Room } from './entities/room.entity';

@ApiTags('ROOMS')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(id: number, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(id, createRoomDto);
  }

  @Post('join/:roomId')
  async joinRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.roomsService.joinRoom(userId, roomId);
  }

  @Get()
  @ApiOkPaginatedResponse(Room, ROOM_PAGINATE_CONFIG)
  @ApiPaginationQuery(ROOM_PAGINATE_CONFIG)
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Room>> {
    return this.roomsService.findAll(query);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.roomsService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.roomsService.deleteById(id);
  }
}
