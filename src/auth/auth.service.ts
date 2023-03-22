import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthHelpersService } from './auth-helpers.service';

export type AuthPromiseReturnType = Promise<{
  accessToken: string;
  statusCode: number;
  username: string;
}>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private authHelpersService: AuthHelpersService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): AuthPromiseReturnType {
    const { username, email, password } = authCredentialsDto;
    const hashedPassword = await this.authHelpersService.hashPassword(password);
    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    try {
      await this.usersRepository.save(user);
      const accessToken = this.authHelpersService.createAccessToken(
        username,
        this.jwtService,
      );
      return { accessToken, statusCode: 201, username };
    } catch (error) {
      this.authHelpersService.throwErrorMessage(error);
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): AuthPromiseReturnType {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (
      user &&
      (await this.authHelpersService.comparePassword(password, user.password))
    ) {
      const accessToken = this.authHelpersService.createAccessToken(
        username,
        this.jwtService,
      );
      return { accessToken, statusCode: 200, username };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
