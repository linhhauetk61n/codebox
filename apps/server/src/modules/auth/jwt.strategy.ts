import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IsString } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class PayloadGuard {
  @IsString()
  id!: string;

  @IsString()
  email!: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'jwt_secret',
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<PayloadGuard> {
    return { id: payload.sub, email: payload.email };
  }
}
