import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class AdminDto {
  @ApiProperty({
    description: 'Admin nickname',
    example: 'johndoe23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Admin name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Admin lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

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

  @ApiProperty({
    description: 'Admin Role',
    example: 'ADMIN',
    required: true,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin nickname',
    example: 'johndoe23',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'Admin name',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Admin lastname',
    example: 'Doe',
    required: true,
  })
  lastname: string;

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

  @ApiProperty({
    description: 'Admin Role',
    example: 'ADMIN',
    required: true,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}

export class UpdateAdminDto extends PartialType(AdminDto) {}
