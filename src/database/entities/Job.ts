import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobCategory } from './JobCategory';
import { JobPosition } from './JobPosition';
import { Application } from './Application';
import { Organization } from './Organization';
import { JobPlatform } from './JobPlatform';
import { Process } from './Process';

@Entity({ name: 'jobs' })
export class Job {
  @PrimaryGeneratedColumn()
  jobId: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  jobStartDate: Date;

  @Column()
  numberOfVacancies: number;

  @Column()
  jobCategoryId: number;

  @Column()
  jobPositionId: number;

  @Column()
  jobPlatformId: number;

  @Column()
  organizationId: number;

  @Column()
  processId: number;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobs)
  jobCategory: JobCategory;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.jobs)
  jobPosition: JobPosition;

  @ManyToOne(() => JobPlatform, (jobPlatform) => jobPlatform.jobs)
  jobPlatform: JobPlatform;

  @ManyToOne(() => Organization, (organization) => organization.jobs)
  organization: Organization;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

  @ManyToOne(() => Process, (process) => process.jobs)
  process: Process;
}
