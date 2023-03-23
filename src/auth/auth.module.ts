import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import UsersModule from 'src/users/users.module';
import User from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import AccessTokenStrategy from './strategies/accessToken.strategy';
import RefreshTokenStrategy from './strategies/refreshToken.strategy';
import AuthHelpersService from './helpers/auth-helpers.service';
import JwtHelpersService from './helpers/jwt-helpers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthHelpersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtHelpersService,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
