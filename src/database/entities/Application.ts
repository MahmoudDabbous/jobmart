import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Test } from './Test';
import { GradingInfo } from './GradingInfo';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Test, (test) => test.applications)
  test: Test;

  @OneToOne(() => GradingInfo, (gradingInfo) => gradingInfo.application)
  @JoinColumn()
  gradingInfo: GradingInfo;
}
