import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/users/repository/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authenticationService: AuthenticationService) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    return this._authenticationService.getAuthenticatedUser(email, password);
  }
}
