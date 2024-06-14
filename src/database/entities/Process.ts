import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProcessStep } from './ProcessStep';
import { Job } from './Job';
import { Recruiter } from './Recruiter';

@Entity({ name: 'processes' })
export class Process {
  @PrimaryGeneratedColumn()
  processId: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  recruiterId: number;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.processes)
  recruiter: Recruiter;

  @OneToMany(() => Job, (job) => job.process)
  jobs: Job[];

  @OneToMany(() => ProcessStep, (processStep) => processStep.process)
  processSteps: ProcessStep[];
}
