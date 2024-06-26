import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isPasswordMatching = await bcryptjs.compare(pass, user.password);
    if (isPasswordMatching) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    return this.usersService.create(createUserDto);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

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
}
