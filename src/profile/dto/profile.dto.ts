import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Level, Position } from '../entities/profile.entity';
import { User } from 'src/users/repository/entities/user.entity';

export class ProfileDto {
  @ApiProperty({
    description: 'Username',
    example: 'John23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  age: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  telephone_number: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: true,
  })
  level: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: true,
  })
  position: Position;

  @ApiProperty({
    description: 'User',
    example: {
      id: 67,
      createdAt: '2024-05-25T16:22:17.478Z',
      updatedAt: '2024-05-25T16:22:17.478Z',
      deletedAt: null,
      email: 'johndoe@mail.com',
      password: '$2b$10$GNykHTbgaKCPoOdeWAl0lO0DX6.rlSpQDbAERqv8BdsFyvSj9laJS',
    },
    required: true,
  })
  user: User;
}

export class CreateProfileDto {
  @ApiProperty({
    description: 'Username',
    example: 'John23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  age: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  telephone_number: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: true,
  })
  level: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: true,
  })
  position: Position;

  @ApiProperty({
    description: 'User',
    example: {
      id: 67,
      createdAt: '2024-05-25T16:22:17.478Z',
      updatedAt: '2024-05-25T16:22:17.478Z',
      deletedAt: null,
      email: 'johndoe@mail.com',
      password: '$2b$10$GNykHTbgaKCPoOdeWAl0lO0DX6.rlSpQDbAERqv8BdsFyvSj9laJS',
    },
    required: true,
  })
  user: User;
}

export class UpdateProfileDto extends PartialType(ProfileDto) {}
