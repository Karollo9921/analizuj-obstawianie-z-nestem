import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerCredentials: RegisterDto,
    @Res() res,
  ): Promise<void> {
    try {
      await this.authService.register(registerCredentials);
      res.status(201).redirect('/auth/login');
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post('/login')
  async login(@Body() loginCredentials: LoginDto, @Res() res): Promise<void> {
    try {
      const { access_token } = await this.authService.login(loginCredentials);
      res.cookie('jwt', access_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.status(200).redirect('/chat-gpt');
    } catch (err) {
      return err;
    }
  }

  @Get('/logout')
  async logout(@Res() res): Promise<void> {
    try {
      res.cookie('jwt', '', { maxAge: 1 });
      res.status(200).redirect('/auth/login');
    } catch (err) {
      return err;
    }
  }

  @Get('/register')
  @Render('./auth/register')
  renderRegister(): object {
    return { success: true };
  }

  @Get('/login')
  @Render('./auth/login')
  renderLogin(): object {
    return { success: true };
  }
}
