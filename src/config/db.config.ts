import { User } from '../auth/user.entity'

export default (): object => (
  {
    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [ User ],
    synchronize: true 
  }
);