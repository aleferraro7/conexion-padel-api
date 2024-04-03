import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
// import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/users/controllers/services/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, ...userDto }: UserDto) {
    const user = await this.usersService.findOneByEmail(userDto.email);

    if (user) {
      throw new BadRequestException('The user already exists');
    }

    await this.usersService.create({
      ...userDto,
      password: await bcryptjs.hash(password, 10),
    });

    return `Welcome ${userDto.username} to Padel Connection`;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Password');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
