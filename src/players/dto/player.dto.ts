import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { Gender, Level, Position } from '../entities/player.entity';

export class PlayerDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true,
  })
  name: string;

  // @ApiProperty({
  //   description: 'City where the User lives',
  //   example: 'Madrid',
  //   required: true,
  // })
  // city: string;

  // @ApiProperty({
  //   description: 'User gender',
  //   example: 'MALE',
  //   required: true,
  // })
  // gender: Gender;

  // @ApiProperty({
  //   description: 'User telephone number',
  //   example: '777001122',
  //   required: false,
  // })
  // telephone_number: string;

  // @ApiProperty({
  //   description: 'User level',
  //   example: '3,00',
  //   required: true,
  // })
  // level: Level;

  // @ApiProperty({
  //   description: 'User position',
  //   example: 'REVES',
  //   required: true,
  // })
  // position: Position;
}

export class CreatePlayerDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true,
  })
  name: string;

  // @ApiProperty({
  //   description: 'City where the User lives',
  //   example: 'Madrid',
  //   required: true,
  // })
  // city: string;

  // @ApiProperty({
  //   description: 'User gender',
  //   example: 'MALE',
  //   required: true,
  // })
  // gender: Gender;

  // @ApiProperty({
  //   description: 'User telephone number',
  //   example: '777001122',
  //   required: false,
  // })
  // telephone_number: string;

  // @ApiProperty({
  //   description: 'User level',
  //   example: '3,00',
  //   required: true,
  // })
  // level: Level;

  // @ApiProperty({
  //   description: 'User position',
  //   example: 'REVES',
  //   required: true,
  // })
  // position: Position;
}

export class UpdatePlayerDto extends PartialType(PlayerDto) {}
