import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User nickname',
    example: 'johndoe23',
    required: true,
  })
  username: string;

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
}
