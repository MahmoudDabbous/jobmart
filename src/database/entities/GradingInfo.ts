import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './Application';

@Entity()
export class GradingInfo {
  @PrimaryGeneratedColumn()
  gradingId: number;

  @Column()
  recruiterId: number;

  @Column()
  totalGrades: number;

  @Column()
  passFailStatus: string;

  @Column()
  answerDetails: string;

  @OneToOne(() => Application, (application) => application.gradingInfo)
  @JoinColumn()
  application: Application;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
