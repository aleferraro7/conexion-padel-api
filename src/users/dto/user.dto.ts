import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  // @ApiProperty({
  //   description: 'User nickname',
  //   example: 'johndoe23',
  //   required: true,
  // })
  // @IsString()
  // @IsNotEmpty()
  // username: string;

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
  password: string;
}

export class CreateUserDto {
  // @ApiProperty({
  //   description: 'User nickname',
  //   example: 'johndoe23',
  //   required: true,
  // })
  // @IsString()
  // @IsNotEmpty()
  // username: string;

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
  password: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}
