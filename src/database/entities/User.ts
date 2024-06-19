import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Applicant } from './Applicant';
import { Admin } from './Admin';
import { Experience } from './Experience';
import { Education } from './Education';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.APPLICANT,
  })
  role: UserRole;

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToOne(() => Applicant, (applicant) => applicant.user)
  applicant: Applicant;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
