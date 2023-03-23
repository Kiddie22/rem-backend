import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BcryptHelpersService {
  static async hashPassword(password: string): Promise<string> {
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
}
