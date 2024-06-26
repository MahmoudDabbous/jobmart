import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
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

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @ManyToOne(() => Document, (document) => document.application)
  document: Document;

  @OneToMany(
    () => ApplicationTest,
    (applicationTest) => applicationTest.application,
  )
  applicationTests: ApplicationTest[];
}
