import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { TokenPayload } from '../tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserData: CreateUserDto): Promise<User> {
    const existEmail = await this.userService.findByEmail(createUserData.email);
    if (existEmail) {
      throw new ConflictException('The user already exists');
    }

    const existUsername = await this.userService.findByEmail(
      createUserData.username,
    );
    if (existUsername) {
      throw new ConflictException('The username is not available');
    }

    const hashedPassword = await bcryptjs.hash(createUserData.password, 10);
    const newUser = await this.userService.createUser({
      ...createUserData,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return newUser;
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credential provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcryptjs.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findOneByUsername(username);
  //   if (!user) {
  //     return null;
  //   }
  //   const isPasswordMatching = await bcryptjs.compare(pass, user.password);
  //   if (isPasswordMatching) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...result } = user.toJSON();
  //     return result;
  //   }
  //   return null;
  // }

  // async register(createUserDto: CreateUserDto): Promise<string> {
  //   return this.userService.create(createUserDto);
  // }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
