import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Applicant } from './Applicant';
import { Job } from './Job';
import { ApplicationDocument } from './ApplicationDocument';
import { ApplicationTest } from './ApplicationTest';
import { ApplicationEvaluation } from './ApplicationEvaluation';
import { Interview } from './Interview';
import { ApplicationStatusChange } from './ApplicationStatusChange';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @Column()
  applicantId: number;

  @Column()
  jobId: number;

  @Column()
  dateOfApplication: Date;

  @Column()
  education: string;

  @Column()
  experience: string;

  @Column()
  otherInfo: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.applications)
  @JoinColumn()
  applicant: Applicant;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn()
  job: Job;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(
    () => ApplicationDocument,
    (applicationDocument) => applicationDocument.application,
  )
  applicationDocuments: ApplicationDocument[];

  @OneToMany(
    () => ApplicationTest,
    (applicationTest) => applicationTest.application,
  )
  applicationTests: ApplicationTest[];

  @OneToMany(
    () => ApplicationStatusChange,
    (applicationStatusChange) => applicationStatusChange.application,
  )
  applicationStatusChanges: ApplicationStatusChange[];

  @OneToMany(() => Interview, (interview) => interview.application)
  interviews: Interview[];

  @OneToMany(
    () => ApplicationEvaluation,
    (applicationEvaluation) => applicationEvaluation.application,
  )
  applicationEvaluations: ApplicationEvaluation[];
}
