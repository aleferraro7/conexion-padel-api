import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
// import { Request } from 'express';

// interface RequestWithUser extends Request {
//   user: {
//     email: string;
//     password: string;
//   };
// }

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
