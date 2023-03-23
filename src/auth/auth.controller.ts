import { Body, Post, Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import GetUser from 'src/users/get-user.decorator';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import JwtHelpersService from './helpers/jwt-helpers.service';

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
  ): Promise<string> {
    const tokens = await this.authService.signUp(createUserDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });
    return tokens.accessToken;
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const tokens = await this.authService.login(authCredentialsDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });
    return tokens.accessToken;
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetUser() user: User): Promise<User> {
    return this.authService.logout(user.id);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(
    @GetUser() user: { user: User; refreshToken: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id } = user.user;
    const { refreshToken } = user;
    return this.jwtHelpersService.refreshTokens(id, refreshToken);
  }
}
