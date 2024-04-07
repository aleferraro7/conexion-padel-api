import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
// import { jwtConstants } from './jwt-constants';
import { Strategy } from 'passport-local';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: jwtConstants.secret,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });

    console.log(`Valor del secret: ${configService.get<string>('JWT_SECRET')}`);
  }

  validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
