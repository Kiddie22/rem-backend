import { BadRequestException, Injectable } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import CreateUserDto from 'src/users/dto/create-user.dto';
import SessionsService from 'src/sessions/sessions.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import BcryptHelpersService from './utils/bcrypt-helpers.service';
import JwtHelpersService from './utils/jwt-helpers.service';

export type AuthPromiseReturnType = Promise<{
  accessToken: string;
  refreshToken: string;
}>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtHelpersService: JwtHelpersService,
    private sessionsService: SessionsService,
  ) {}

  async signUp(createUserDto: CreateUserDto): AuthPromiseReturnType {
    const hashedPassword = await BcryptHelpersService.hashPassword(
      createUserDto.password,
    );
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    const session = await this.sessionsService.createSession({
      userId: user.id,
    });
    const tokens = await this.jwtHelpersService.getTokens(
      user,
      session.sessionId,
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
    const session = await this.sessionsService.createSession({
      userId: user.id,
    });
    const tokens = await this.jwtHelpersService.getTokens(
      user,
      session.sessionId,
    );
    return tokens;
  }

  async logout(sessionId: string): Promise<void> {
    return this.sessionsService.revokeSession(sessionId);
  }
}
