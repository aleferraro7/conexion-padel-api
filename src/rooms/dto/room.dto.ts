import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoomDto {
  @ApiProperty({
    description: 'Name of the room',
    example: 'Room example',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateRoomDto {
  @ApiProperty({
    description: 'Name of the room',
    example: 'Room example',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
