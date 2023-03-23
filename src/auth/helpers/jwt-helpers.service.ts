import { ForbiddenException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import User from 'src/users/entities/user.entity';
import UsersService from 'src/users/users.service';
import jwtConstants from '../constants';
import BcryptHelpersService from './bcrypt-helpers.service';

@Injectable()
export default class JwtHelpersService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createAccessToken(user: User): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.access_secret,
      expiresIn: '10m',
    });
    return accessToken;
  }

  async createRefreshToken(user: User): Promise<string> {
    const { id, username } = user;
    const payload: JwtPayload = { id, username };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refresh_secret,
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await BcryptHelpersService.hashPassword(
      refreshToken,
    );
    await this.usersService.updateUser(id, {
      refresh_token: hashedRefreshToken,
    });
  }

  async getTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async refreshTokens(
    id: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.getUserById(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
