import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({
    description: 'Admin mail',
    example: 'johndoe@mail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Admin password',
    example: '123456',
    required: true,
  })
  password: string;
}
