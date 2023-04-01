import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  register(
    registerCredentials: RegisterDto,
  ): Promise<User | BadRequestException> {
    return this.userService.create(registerCredentials);
  }

  async login(loginCredentials: LoginDto): Promise<{ access_token: string }> {
    const { password } = loginCredentials;
    const user: User = await this.userService.findOne(
      loginCredentials.loginEmail,
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login: user.login, email: user.email };
      const access_token: string = this.jwtService.sign(payload);

      return { access_token };
    } else {
      throw new Error('Something is wrong with your logging credentials...');
    }
  }
}
