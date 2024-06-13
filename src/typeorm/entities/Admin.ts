import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.js';

@Entity({ name: 'admins' })
export class Admin {
  @OneToOne(() => User, (user) => user.id)
  @PrimaryColumn()
  user: User;
}
