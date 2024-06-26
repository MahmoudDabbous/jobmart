import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './Applicant';

@Entity({ name: 'experiences' })
export class Experience {
  @PrimaryGeneratedColumn()
  experienceId: number;

  @ManyToOne(() => Applicant, (user) => user.experiences, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applicant: Applicant;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
