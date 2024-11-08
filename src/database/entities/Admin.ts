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

  @OneToOne(() => User, (user) => user.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ default: null })
  permissions: string;
}
