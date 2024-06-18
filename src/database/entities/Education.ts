import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './Applicant';

@Entity({ name: 'educations' })
export class Education {
  @PrimaryGeneratedColumn()
  educationId: number;

  @ManyToOne(() => Applicant, (user) => user.educations)
  applicant: Applicant;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  fieldOfStudy: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  grade: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
