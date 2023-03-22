import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export default class AuthHelpersService {
  static async hashPassword({
    password,
  }: {
    password: string;
  }): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    inputPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    const isEqual = await bcrypt.compare(inputPassword, userPassword);
    return isEqual;
  }

  static createAccessToken(username: string, jwtService: JwtService): string {
    const payload: JwtPayload = { username };
    const accessToken = jwtService.sign(payload);
    return accessToken;
  }

  static throwErrorMessage(error): void {
    if (error.code === '23505') {
      // duplicate values
      const errorLog = error.detail;
      if (errorLog.includes('Key (email)')) {
        throw new ConflictException(
          'An account with that email already exists',
        );
      } else {
        throw new ConflictException(
          'An account with that username already exists',
        );
      }
    } else {
      throw new InternalServerErrorException();
    }
  }
}
