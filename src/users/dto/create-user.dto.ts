import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @MinLength(4, {
    message: 'Username too short.',
  })
  @MaxLength(20, {
    message: 'Username too long.',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  refreshToken?: string;
}
