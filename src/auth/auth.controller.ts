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
import { AuthService } from './auth.service';
import { LoginDto } from 'src/common/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { Public } from 'src/common/public.decorator';
import { RegisterDto } from 'src/common/register.dto';
import { User } from 'src/users/repository/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('signIn')
  // async signIn(@Body() signInDto: LoginDto) {
  //   return await this.authService.signIn(signInDto.email, signInDto.password);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() signInDto: LoginDto,
    // @Req() req: Request,
    @Res() res: Response,
  ) {
    const { access_token } = await this.authService.signIn(signInDto);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ access_token, status: 'ok' });
  }

  // @ApiBearerAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async signIn(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<void> {
  //   const { access_token } = await this.authService.login(req.user);
  //   res
  //     .cookie('access_token', access_token, {
  //       httpOnly: true,
  //       secure: false,
  //       sameSite: 'lax',
  //       expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
  //     })
  //     .send({ status: 'ok' });
  // }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('access_token', this.authService.getCookieForLogOut());
  }
}
