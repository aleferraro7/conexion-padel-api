import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { User } from '../repository/entities/user.entity';
import { UsersRepository } from '../repository/users.repository';
import { PinoLogger } from 'nestjs-pino';
import { PostgresErrorCode } from 'src/config/postgresErrorCodes.enum';
import { RegisterDto } from 'src/common/dtos/register.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly logger: PinoLogger,
  ) {
    super(usersRepository);
    this.logger.setContext(UsersService.name);
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exists',
      HttpStatus.NOT_FOUND,
    );
  }

  async register(registerData: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      const createdUser = await this.usersRepository.save({
        ...registerData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
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
}
