import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.usersService.findByEmail(email);
    await this.verifyPassword(plainTextPassword, user.password);
    user.password = undefined;
    return user;
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcryptjs.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new Error('Invalid data');
    }
  }

  // async login({ email, password }: LoginDto) {
  //   const user = await this.usersService.findByEmail(email);

  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   const isValidPassword = await bcryptjs.compare(password, user.password);

  //   if (!isValidPassword) {
  //     throw new UnauthorizedException('Invalid Password');
  //   }

  //   const payload = { email: user.email, role: user.roles };
  //   const token = await this.jwtService.signAsync(payload);

  //   return { token };
  // }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
