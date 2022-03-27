import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerCredentials: RegisterDto): Promise<void> {
    try {
      const { login, email, password } = registerCredentials;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = User.create(
        { 
          login: login.toLowerCase(), 
          email: email.toLowerCase(), 
          password: hashedPassword 
        }
      )
      await user.save();
    } catch (error) {
      console.log(`Error: ${error}`);
    };
  };
};
