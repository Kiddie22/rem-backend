import { BadRequestException, Injectable } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import BcryptHelpersService from './helpers/bcrypt-helpers.service';
import JwtHelpersService from './helpers/jwt-helpers.service';
import Argon2HelpersClass from './helpers/argon2-helpers.service';
import AuthHelpersService from './helpers/auth-helpers.service';

export type AuthPromiseReturnType = Promise<{
  tokens: { accessToken: string; refreshToken: string };
  secret: string;
}>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtHelpersService: JwtHelpersService,
  ) {}

  async signUp(createUserDto: CreateUserDto): AuthPromiseReturnType {
    const hashedPassword = await BcryptHelpersService.hashPassword(
      createUserDto.password,
    );
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const secret = AuthHelpersService.generateString(32);
    const hashedKey = await Argon2HelpersClass.hashToken(secret);
    const tokens = await this.jwtHelpersService.getTokens(user, hashedKey);
    await this.jwtHelpersService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return { tokens, secret };
  }

  async login(authCredentialsDto: AuthCredentialsDto): AuthPromiseReturnType {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.getUserByUsername(username);
    if (
      !user ||
      !(await BcryptHelpersService.compare(password, user.password))
    ) {
      throw new BadRequestException('Invalid credentials');
    }
    const secret = AuthHelpersService.generateString(32);
    const hashedKey = await Argon2HelpersClass.hashToken(secret);
    const tokens = await this.jwtHelpersService.getTokens(user, hashedKey);
    await this.jwtHelpersService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return { tokens, secret };
  }

  async logout(id: string): Promise<User> {
    return this.usersService.updateUser(id, { refreshToken: null });
  }
}
