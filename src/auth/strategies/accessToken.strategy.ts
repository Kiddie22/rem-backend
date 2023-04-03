import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export default class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;
    const user: User = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
