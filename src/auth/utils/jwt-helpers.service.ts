import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import SessionsService from 'src/sessions/sessions.service';
import User from 'src/users/entities/user.entity';

@Injectable()
export default class JwtHelpersService {
  constructor(
    private jwtService: JwtService,
    private sessionsService: SessionsService,
  ) {}

  async createAccessToken(user: User): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: `${process.env.ACCESS_EXP_TIME}m`,
    });
    return accessToken;
  }

  async createRefreshToken(user: User, sessionId: string): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username, sessionId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: `${process.env.REFRESH_EXP_TIME}m`,
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
