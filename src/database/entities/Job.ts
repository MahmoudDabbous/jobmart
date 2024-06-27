import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobCategory } from './JobCategory';
import { JobPosition } from './JobPosition';
import { Application } from './Application';
import { JobPlatform } from './JobPlatform';

@Entity({ name: 'jobs' })
export class Job {
  @PrimaryGeneratedColumn()
  jobId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  jobStartDate: Date;

  @Column({ default: 1 })
  numberOfVacancies: number;

  @ManyToOne(() => JobCategory, (jobCategory) => jobCategory.jobs)
  jobCategory: JobCategory;

  @ManyToOne(() => JobPosition, (jobPosition) => jobPosition.jobs)
  jobPosition: JobPosition;

  @ManyToOne(() => JobPlatform, (jobPlatform) => jobPlatform.jobs)
  jobPlatform: JobPlatform;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
