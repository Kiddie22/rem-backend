import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import Role, { RolesArray } from 'src/auth/roles/role-type';
import ByteLengthValidator from 'src/auth/utils/byte-length-validator';

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
  @Validate(ByteLengthValidator)
  password: string;

  @IsEnum(RolesArray)
  role: Role;
}
