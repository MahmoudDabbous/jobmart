import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn()
  adminId: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column({ default: null })
  permissions: string;
}
