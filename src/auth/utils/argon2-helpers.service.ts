import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export default class Argon2HelpersClass {
  static hashToken(refreshToken: string): Promise<string> {
    return argon2.hash(refreshToken);
  }

  static verifyToken(userToken: string, inputToken: string): Promise<boolean> {
    return argon2.verify(userToken, inputToken);
  }
}
