import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Level, Position } from '../repository/entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'User mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Username',
    example: 'John23',
    required: true,
  })
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  @IsString()
  telephone_number?: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: false,
  })
  level?: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: false,
  })
  position?: Position;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Username',
    example: 'John23',
    required: true,
  })
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Name',
    example: 'John',
    required: true,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    required: true,
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Age',
    example: 25,
    required: true,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'Telephone number',
    example: '666303030',
    required: true,
  })
  @IsString()
  telephone_number?: string;

  @ApiProperty({
    description: 'Level',
    example: '4,00',
    required: false,
  })
  level?: Level;

  @ApiProperty({
    description: 'Position',
    example: 'BOTH',
    required: false,
  })
  position?: Position;
}

export class UpdateUserDto extends PartialType(UserDto) {}
