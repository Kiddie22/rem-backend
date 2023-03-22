import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import User from './user.entity';
import jwtConstants from './constants';
import { AuthService } from './auth.service';
import JwtStrategy from './jwt.strategy';
import AuthController from './auth.controller';
import AuthHelpersService from './auth-helpers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthService, AuthHelpersService, JwtStrategy],
  controllers: [AuthController],
})
export default class AuthModule {}
