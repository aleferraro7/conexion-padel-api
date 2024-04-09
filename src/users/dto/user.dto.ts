import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Gender, Position } from '../schemas/user.schema';
import { Role } from 'src/common/enums/role.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'User nickname',
    example: 'johndoe23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
    required: true,
  })
  age: number;

  @ApiProperty({
    description: 'City where the User lives',
    example: 'Madrid',
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'Community where the User lives',
    example: 'Comunidad de Madrid',
    required: true,
  })
  community: string;

  @ApiProperty({
    description: 'User mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'MALE',
    required: true,
  })
  gender: Gender;

  @ApiProperty({
    description: 'User telephone number',
    example: 777001122,
    required: false,
  })
  telephone_number: number;

  @ApiProperty({
    description: 'User level',
    example: 3.5,
    required: true,
  })
  level: number;

  @ApiProperty({
    description: 'User position',
    example: 'REVES',
    required: true,
  })
  position: Position;

  @ApiProperty({
    description: 'User Role',
    example: 'USER',
    required: true,
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User nickname',
    example: 'johndoe23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @ApiProperty({
    description: 'User age',
    example: 25,
    required: true,
  })
  age: number;

  @ApiProperty({
    description: 'City where the User lives',
    example: 'Madrid',
    required: true,
  })
  city: string;

  @ApiProperty({
    description: 'Community where the User lives',
    example: 'Comunidad de Madrid',
    required: true,
  })
  community: string;

  @ApiProperty({
    description: 'User mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'User gender',
    example: 'MALE',
    required: true,
  })
  gender: Gender;

  @ApiProperty({
    description: 'User telephone number',
    example: 777001122,
    required: false,
  })
  telephone_number: number;

  @ApiProperty({
    description: 'User level',
    example: 3.5,
    required: true,
  })
  level: number;

  @ApiProperty({
    description: 'User position',
    example: 'REVES',
    required: true,
  })
  position: Position;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class UpdateUserDto extends PartialType(UserDto) {}
