import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import jwtConstants from 'src/constants';
import SessionsService from 'src/sessions/sessions.service';
import User from 'src/users/entities/user.entity';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
  ) {
    super({
      secretOrKey: jwtConstants.refresh_secret,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => {
          const refreshToken = request.cookies['refresh-token'];
          if (!refreshToken) return null;
          return refreshToken;
        },
      ]),
    });
  }

  async validate(
    _req: Request,
    payload: JwtPayload,
  ): Promise<{ user: User; sessionId: string }> {
    const { id, sessionId } = payload;
    const user = await this.usersService.getUserById(id);
    if (!user || !sessionId) throw new UnauthorizedException();
    const session = await this.sessionsService.getSessionById(sessionId);
    if (user.id !== session.userId || !session.isValid)
      throw new UnauthorizedException();
    if (session.expiredAt < Date.now()) {
      this.sessionsService.revokeSession(sessionId);
      throw new UnauthorizedException();
    }
    this.sessionsService.sessionCleanup(user.id);
    return { user, sessionId };
  }
}
