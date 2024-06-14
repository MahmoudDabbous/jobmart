import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'educations' })
export class Education {
  @PrimaryGeneratedColumn()
  educationId: string;

  @ManyToOne(() => User, (user) => user.educations)
  user: User;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  fieldOfStudy: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  grade: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
