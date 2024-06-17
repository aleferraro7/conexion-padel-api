import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
// import { PinoLogger } from 'nestjs-pino';
import { LoginDto } from 'src/common/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    // private readonly logger: PinoLogger,
  ) {
    // this.logger.setContext(AuthService.name);
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logOut(@Res({ passthrough: true }) res) {
    res.cookie('access_token', '', { expires: new Date(Date.now()) });
    return {};
  }
}
