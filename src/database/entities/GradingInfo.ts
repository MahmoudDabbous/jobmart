import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
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
}
