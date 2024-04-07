import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './services/auth.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private moduleRef: ModuleRef,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
