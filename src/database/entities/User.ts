import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './Applicant';
import { Admin } from './Admin';

enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.APPLICANT,
  })
  role: UserRole;

  @OneToOne(() => Applicant, (applicant) => applicant.user)
  applicant: Applicant;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
