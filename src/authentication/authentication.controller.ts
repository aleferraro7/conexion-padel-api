import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/repository/entities/user.entity';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { RequestWithUser } from './request-with-user.interface';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './register.dto';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
// import { LoginDto } from './login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto): Promise<User> {
    return await this._authenticationService.register(userData);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this._authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send;
  }

  // @UseGuards(LocalAuthenticationGuard)
  // @Post('login')
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async login(@Req() req, @Body() loginDto: LoginDto) {
  //   return this._authenticationService.login(req.user);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this._authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
