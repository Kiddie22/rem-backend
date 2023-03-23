import { BadRequestException, Injectable } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import BcryptHelpersService from './helpers/bcrypt-helpers.service';
import JwtHelpersService from './helpers/jwt-helpers.service';

export type AuthPromiseReturnType = Promise<{
  accessToken: string;
  refreshToken: string;
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
    const tokens = await this.jwtHelpersService.getTokens(user);
    await this.jwtHelpersService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return tokens;
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
    const tokens = await this.jwtHelpersService.getTokens(user);
    await this.jwtHelpersService.updateRefreshToken(
      user.id,
      tokens.refreshToken,
    );
    return tokens;
  }

  async logout(id: string): Promise<User> {
    return this.usersService.updateUser(id, { refreshToken: null });
  }
}
