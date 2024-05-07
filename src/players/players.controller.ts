import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePlayerDto, UpdatePlayerDto } from './dto/player.dto';

@ApiTags('PLAYERS')
@Controller('players')
export class PlayersController {
  constructor(private readonly _playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this._playersService.createPlayer(createPlayerDto);
  }

  @Get()
  async findAll() {
    return this._playersService.getPlayers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this._playersService.getPlayerById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this._playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this._playersService.deletePlayer(id);
  }
}
