import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { Profile } from 'src/profile/entities/profile.entity';

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
  password: string;

  // @ApiProperty({
  //   description: 'Profile',
  //   example: {
  //     username: 'John23',
  //     name: 'John',
  //     lastname: 'Doe',
  //     age: 25,
  //     telephone_number: '666303030',
  //     level: '4,00',
  //   },
  //   required: true,
  // })
  // profile: Profile;
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
  password: string;

  // @ApiProperty({
  //   description: 'Profile',
  //   example: {
  //     username: 'John23',
  //     name: 'John',
  //     lastname: 'Doe',
  //     age: 25,
  //     telephone_number: '666303030',
  //     level: '4,00',
  //   },
  //   required: true,
  // })
  // profile: Profile;
}

export class UpdateUserDto extends PartialType(UserDto) {}
