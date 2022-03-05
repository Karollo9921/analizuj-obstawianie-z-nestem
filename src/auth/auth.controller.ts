import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerCredentials: RegisterDto): Promise<void> {
    return this.authService.register(registerCredentials);
  };

  @Post('/login')
  login(@Body() loginCredentials: LoginDto): Promise<void> {
    return this.authService.login(loginCredentials);
  };
};
