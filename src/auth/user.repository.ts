import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dtos/register.dto';
import bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(registerCredentials: RegisterDto): Promise<void> {
    try {
      const { login, email, password, passwordConfirm } = registerCredentials;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = User.create({ login, email, password: hashedPassword })
      await user.save();
    } catch (error) {
      console.log(`Error: ${error}`);
    };
  };
};
