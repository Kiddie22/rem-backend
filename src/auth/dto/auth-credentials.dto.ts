import { IsString, MaxLength, MinLength, Validate } from 'class-validator';
import MaxPasswordLength from '../utils/password-custom-validator';

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
  @Validate(MaxPasswordLength)
  password: string;
}
