import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import jwtConstants from '../constants';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export default class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    req: Request,
    payload: JwtPayload,
  ): Promise<{ user: User; refreshToken: string }> {
    const { id } = payload;
    const refreshToken = req.cookies['refresh-token'];
    if (!refreshToken) {
      throw new BadRequestException('Invalid token');
    }
    const user: User = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { user, refreshToken };
  }
}
