import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { UserRepository } from './user.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {};

  async register(registerCredentials: RegisterDto): Promise<void> {
    return await this.userRepository.createUser(registerCredentials);
  };

  async login(loginCredentials: LoginDto): Promise<User> {
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
      return user;
    } else {
      throw new Error('Something is wrong with your logging credentials...')
    };
  };
};
