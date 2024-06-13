import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Profile } from 'src/profile/entities/profile.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@mail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    example: '123456',
    required: true,
  })
  // @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Profile',
    example: {
      username: 'John23',
      name: 'John',
      lastname: 'Doe',
      age: 25,
      telephone_number: '666303030',
      level: '4,00',
      gender: 'MALE',
    },
    required: true,
  })
  profile: Profile;
}
