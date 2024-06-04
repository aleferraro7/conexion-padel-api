import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { Public } from 'src/common/public.decorator';
import { User } from 'src/users/repository/entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import { RegisterDto } from 'src/common/dtos/register.dto';
import { LoginDto } from 'src/common/dtos/login.dto';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from './auth.service.';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.usersService.register(registerDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: LoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(signInDto);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ access_token, status: 'ok' });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Res({ passthrough: true }) res) {
    return this.authService.logOut(res);
  }
}
