import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';

@Injectable()
export default class AuthHelpersService {
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

  static returnTokenExpiryDate(): Date {
    const date = new Date();
    date.setTime(date.getTime() + 15 * 60 * 1000);
    return date;
  }
}
