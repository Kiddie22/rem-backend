import { Body, Post, Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import GetUser from 'src/users/get-user.decorator';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import JwtHelpersService from './helpers/jwt-helpers.service';

type ControllerReturnType = Promise<{
  accessToken: string;
  refreshToken: string;
}>;

@Controller('auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private jwtHelpersService: JwtHelpersService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): ControllerReturnType {
    const { tokens, secret } = await this.authService.signUp(createUserDto);
    response.cookie('secret', secret, {
      httpOnly: true,
    });
    return tokens;
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): ControllerReturnType {
    const { tokens, secret } = await this.authService.login(authCredentialsDto);
    response.cookie('secret', secret, {
      httpOnly: true,
    });
    return tokens;
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetUser() user: User): { message: string } {
    this.authService.logout(user.id);
    return { message: 'Logged out' };
  }

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokens(
    @GetUser() user: { user: User; refreshToken: string },
    @Res({ passthrough: true }) response: Response,
  ): ControllerReturnType {
    const { id } = user.user;
    const { refreshToken } = user;
    const { tokens, secret } = await this.jwtHelpersService.refreshTokens(
      id,
      refreshToken,
    );
    response.cookie('secret', secret, {
      httpOnly: true,
    });
    return tokens;
  }
}
