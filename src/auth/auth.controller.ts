import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/common/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { Public } from 'src/common/public.decorator';
import { RegisterDto } from 'src/common/register.dto';
import { User } from 'src/users/repository/entities/user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    this.logger.log(`Creating user ${registerDto.email}`);
    return await this.authService.register(registerDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: LoginDto, @Res() res: Response) {
    this.logger.log(`User ${signInDto.email} is logging`);
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
    this.logger.log(`User ${req.user.email} is watching their profile`);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Res({ passthrough: true }) res) {
    this.logger.log(`Cookie will be deleted`);
    return this.authService.logOut(res);
  }
}
