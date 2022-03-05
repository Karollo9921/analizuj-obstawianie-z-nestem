import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentials: { login: string, email: string, password: string }): Promise<void> {
    try {
      const { login, email, password } = authCredentials;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = User.create({ login, email, password: hashedPassword })
      await user.save();
    } catch (error) {
      console.log(`Error: ${error}`);
    };
  };
};
