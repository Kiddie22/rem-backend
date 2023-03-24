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
import Argon2HelpersClass from '../helpers/argon2-helpers.service';

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<{ user: User; refreshToken: string }> {
    const { id, hashedKey } = payload;
    const { secret } = req.cookies;
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const secretsMatch = Argon2HelpersClass.verifyToken(hashedKey, secret);
    if (!secret || !secretsMatch) {
      throw new BadRequestException('Invalid secret');
    }
    const user: User = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { user, refreshToken };
  }
}
