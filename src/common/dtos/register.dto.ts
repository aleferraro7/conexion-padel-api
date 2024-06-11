import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@mail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  // @ApiProperty({
  //   description: 'User name',
  //   example: 'John',
  //   required: true,
  // })
  // name: string;

  @ApiProperty({
    description: 'user password',
    example: '123456',
    required: true,
  })
  // @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
