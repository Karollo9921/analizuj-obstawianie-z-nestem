import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { UserRepository } from './user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {};

  async register(registerCredentials: RegisterDto): Promise<void> {
    return await this.userRepository.createUser(registerCredentials);
  };

  async login(loginCredentials: LoginDto): Promise<{ access_token: string }> {
    const { loginEmail, password } = loginCredentials;
    const user: User = await User.findOne(
      {
        where: [
          { login: loginEmail },
          { email: loginEmail }
        ]
      }
    );

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login: user.login, email: user.email };
      const access_token: string = this.jwtService.sign(payload);

      return { access_token };
    } else {
      throw new Error('Something is wrong with your logging credentials...')
    };
  };
};
