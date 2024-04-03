import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    description: 'User mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'user password',
    example: '123456',
    required: true,
  })
  password: string;
}
