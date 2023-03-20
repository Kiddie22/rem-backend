import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, {
    message: 'Username too short.',
  })
  @MaxLength(20, {
    message: 'Username too long.',
  })
  username: string;

  @IsEmail({}, { message: 'Valid email not provided.' })
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password too short.',
  })
  @MaxLength(32, {
    message: 'Password too long.',
  })
  password: string;
}
