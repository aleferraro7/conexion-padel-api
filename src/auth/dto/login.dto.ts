import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User username',
    example: 'johndoe23',
    required: true,
  })
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'user password',
    example: '123456',
    required: true,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
