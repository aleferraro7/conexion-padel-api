import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, ...createUserDto }: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('The user already exists');
    }

    await this.usersService.create({
      ...createUserDto,
      password: await bcryptjs.hash(password, 10),
      role: Role.USER,
    });

    return `Welcome ${createUserDto.username} to Padel Connection`;
  }

  // async login({ email, password }: LoginDto) {
  //   const user = await this.usersService.findOneByEmail(email);

  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   const isValidPassword = await bcryptjs.compare(password, user.password);

  //   if (!isValidPassword) {
  //     throw new UnauthorizedException('Invalid Password');
  //   }

  //   const payload = { email: user.email, role: user.role };
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
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
