import { IsString } from 'class-validator';

export default class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
