import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from './Test';
import { GradingInfo } from './GradingInfo';
import { Applicant } from './Applicant';
import { Job } from './Job';
import { Document } from './Document';
import { ApplicationTest } from './ApplicationTest';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @ManyToOne(() => Test, (test) => test.applications)
  test: Test;

  @OneToOne(() => GradingInfo, (gradingInfo) => gradingInfo.application)
  @JoinColumn()
  gradingInfo: GradingInfo;

  @ManyToOne(() => Applicant, (applicant) => applicant.applications)
  applicant: Applicant;

  @ManyToOne(() => Job, (job) => job.applications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  job: Job;

  @ManyToOne(() => Document, (document) => document.application, {
    onDelete: 'CASCADE',
  })
  document: Document;

  @OneToMany(
    () => ApplicationTest,
    (applicationTest) => applicationTest.application,
  )
  applicationTests: ApplicationTest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
