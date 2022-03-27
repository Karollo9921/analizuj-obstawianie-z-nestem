import { Body, Controller, Get, Post, Render } from '@nestjs/common';
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

  @Get('/register')
  @Render('./auth/register')
  renderRegister(): object {
    return { success: true };
  };

  @Post('/login')
  login(@Body() loginCredentials: LoginDto): Promise<{ access_token: string }> {
    console.log(loginCredentials);
    return this.authService.login(loginCredentials);
  };

  @Get('/login')
  @Render('./auth/login')
  renderLogin(): object {
    return { success: true };
  };
};
