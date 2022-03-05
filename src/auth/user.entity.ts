import { 
  Entity, 
  BaseEntity, 
  Column, 
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ unique: true })
  login!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  last_update: Date | undefined;
};
