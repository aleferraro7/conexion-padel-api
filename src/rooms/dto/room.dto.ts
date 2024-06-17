import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/repository/entities/user.entity';

export class RoomDto {
  @ApiProperty({
    description: 'Name of the room',
    example: 'Room example',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Users in the room',
    example: 87,
    required: true,
  })
  users: User[];
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

  @ApiProperty({
    description: 'Users in the room',
    example: 87,
    required: true,
  })
  users: User[];
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
