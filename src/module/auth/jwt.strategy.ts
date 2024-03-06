
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as dotenv from 'dotenv';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '74953f9ce7b3173f13bcf65d713506a485fc6fc1f837d3b0abd52905d7c6d079'
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.email, role: payload.role };
  }
}
