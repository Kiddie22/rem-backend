import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import jwtConstants from 'src/constants';
import SessionsService from 'src/sessions/sessions.service';
import User from 'src/users/entities/user.entity';
import UsersService from 'src/users/users.service';

@Injectable()
export default class JwtHelpersService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionsService: SessionsService,
  ) {}

  async createAccessToken(user: User): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.access_secret,
      expiresIn: '1m',
    });
    return accessToken;
  }

  async createRefreshToken(user: User, sessionId: string): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username, sessionId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refresh_secret,
      expiresIn: '5m',
    });
    return refreshToken;
  }

  async getTokens(
    user: User,
    sessionId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user, sessionId);
    return { accessToken, refreshToken };
  }

  async refreshTokens(
    user: User,
    sessionId: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    this.sessionsService.updateSession(sessionId);
    const tokens = await this.getTokens(user, sessionId);
    return tokens;
  }
}
