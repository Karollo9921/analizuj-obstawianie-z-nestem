import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entity/user.entity';
import { RegisterDto } from '../auth/dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: RegisterDto): Promise<User> {
    const { login, email, password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findOne({
      $or: [{ login: dto.login }, { email: dto.email }],
    });
    if (user) {
      throw new BadRequestException('Provided Login or Email already exists');
    }

    return this.userModel.create({
      login,
      email,
      password: hashedPassword,
    });
  }

  findOne(loginEmail: string): Promise<User> {
    return this.userModel.findOne({
      $or: [{ login: loginEmail }, { email: loginEmail }],
    });
  }
}
