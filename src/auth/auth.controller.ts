import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.login(authCredentialsDto);
  }
}
