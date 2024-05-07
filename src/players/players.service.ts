import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/player.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly _playersRepository: Repository<Player>,
  ) {}

  async getPlayers(): Promise<Player[]> {
    return await this._playersRepository.find();
  }

  async getPlayerById(id: number) {
    return await this._playersRepository.findBy({ id });
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = await this._playersRepository.create(createPlayerDto);
    await this._playersRepository.save(newPlayer);
    return newPlayer;
  }

  async updatePlayer(id: number, updatePlayerData: Partial<Player>) {
    await this._playersRepository.update(id, updatePlayerData);
    const updatedPlayer = await this.getPlayerById(id);
    if (updatedPlayer) {
      return updatedPlayer;
    }
    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
  }

  async deletePlayer(id: number) {
    const deleteResponse = await this._playersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }
  }
}
