import { Body, Post, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/entities/user.entity';
import GetUser from 'src/users/get-user.decorator';
import { AuthPromiseReturnType, AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import JwtHelpersService from './helpers/jwt-helpers.service';

@Controller('auth')
export default class AuthController {
  constructor(
    private authService: AuthService,
    private jwtHelpersService: JwtHelpersService,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): AuthPromiseReturnType {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() authCredentialsDto: AuthCredentialsDto): AuthPromiseReturnType {
    return this.authService.login(authCredentialsDto);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetUser() user: User): Promise<User> {
    return this.authService.logout(user.id);
  }

  @Get('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshTokens(
    @GetUser() user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id } = user;
    return this.jwtHelpersService.refreshTokens(id);
  }
}
