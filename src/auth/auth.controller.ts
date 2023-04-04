import { Body, Post, Controller, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import GetUser from 'src/users/get-user.decorator';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import AuthHelpersService from './utils/auth-helpers.service';
import JwtHelpersService from './utils/jwt-helpers.service';

type ControllerReturnType = Promise<{
  user: User;
  accessToken: string;
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
    const { user, tokens } = await this.authService.signUp(createUserDto);
    const { accessToken, refreshToken } = tokens;
    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      expires: AuthHelpersService.returnTokenExpiryDate(
        process.env.REFRESH_EXP_TIME,
      ),
    });
    return { user, accessToken };
  }

  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): ControllerReturnType {
    const { user, tokens } = await this.authService.login(authCredentialsDto);
    const { accessToken, refreshToken } = tokens;
    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      expires: AuthHelpersService.returnTokenExpiryDate(
        process.env.REFRESH_EXP_TIME,
      ),
    });
    return { user, accessToken };
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt-refresh'))
  logout(@GetUser() reqUser: { user: User; sessionId: string }): {
    message: string;
  } {
    this.authService.logout(reqUser.sessionId);
    return { message: 'Logged out' };
  }

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokens(
    @GetUser() reqUser: { user: User; sessionId: string },
    @Res({ passthrough: true }) response: Response,
  ): ControllerReturnType {
    const { user, sessionId } = reqUser;
    const { accessToken, refreshToken } =
      await this.jwtHelpersService.refreshTokens(user, sessionId);
    response.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      expires: AuthHelpersService.returnTokenExpiryDate(
        process.env.REFRESH_EXP_TIME,
      ),
    });
    return { user, accessToken };
  }
}
