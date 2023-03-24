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
  ): Promise<{ accessToken: string }> {
    const tokens = await this.authService.signUp(createUserDto);
    const { accessToken, refreshToken } = tokens;
    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
    });
    return { accessToken };
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const tokens = await this.authService.login(authCredentialsDto);
    const { accessToken, refreshToken } = tokens;
    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
    });
    return { accessToken };
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
  ): Promise<{ accessToken: string }> {
    const { id } = user.user;
    const { refreshToken } = user;
    const tokens = await this.jwtHelpersService.refreshTokens(id, refreshToken);
    response.cookie('refresh-token', tokens.refreshToken, {
      httpOnly: true,
    });
    const { accessToken } = tokens;
    return { accessToken };
  }
}
