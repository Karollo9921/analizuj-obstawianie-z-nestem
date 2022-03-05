import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() authCredentials: object): Promise<void> {
    return this.authService.register(authCredentials);
  };

  @Post('/login')
  login(@Body() authCredentials: object): Promise<void> {
    return this.authService.login(authCredentials);
  };
};
