import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import ByteLengthValidator from '../utils/byte-length-validator';

export default class AuthCredentialsDto {
  @IsString()
  @MinLength(4, {
    message: 'Username too short.',
  })
  @MaxLength(20, {
    message: 'Username too long.',
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'Password too short.',
  })
  @Validate(ByteLengthValidator)
  password: string;
}
