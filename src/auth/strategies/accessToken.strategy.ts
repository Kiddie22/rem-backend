import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export default class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor() {
    super({
      secretOrKey: process.env.ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(
    payload: JwtPayload,
  ): Promise<{ id: string; username: string }> {
    const { id, username } = payload;
    const user = { id, username };
    return user;
  }
}
