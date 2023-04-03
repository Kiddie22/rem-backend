import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import UsersModule from 'src/users/users.module';
import User from 'src/users/entities/user.entity';
import SessionsModule from 'src/sessions/sessions.module';
import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import AccessTokenStrategy from './strategies/accessToken.strategy';
import RefreshTokenStrategy from './strategies/refreshToken.strategy';
import JwtHelpersService from './utils/jwt-helpers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    PassportModule,
    UsersModule,
    SessionsModule,
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtHelpersService,
  ],
  controllers: [AuthController],
})
export default class AuthModule {}
