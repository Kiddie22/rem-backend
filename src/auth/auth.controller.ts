import { Body, Post, Controller } from '@nestjs/common';
import { AuthPromiseReturnType, AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): AuthPromiseReturnType {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  login(@Body() authCredentialsDto: AuthCredentialsDto): AuthPromiseReturnType {
    return this.authService.login(authCredentialsDto);
  }
}
