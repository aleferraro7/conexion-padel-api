import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/common/register.dto';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/config/postgresErrorCodes.enum';
import { LoginDto } from 'src/common/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    this.logger.log('Hashing password');
    try {
      const createdUser = await this.usersService.createUser({
        ...registerDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      this.logger.log(`user ${registerDto.email} was created `);
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    this.logger.log(`finding user ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    this.logger.log(`Comparing ${email} password`);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email };
    this.logger.log(`Creating payload`);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async logOut(@Res({ passthrough: true }) res) {
    this.logger.log(`Deleting cookie`);
    res.cookie('access_token', '', { expires: new Date(Date.now()) });
    return {};
  }
}
