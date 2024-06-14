import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Applicant } from './Applicant';
import { Admin } from './Admin';
import { Experience } from './Experience';
import { Education } from './Education';

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

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
