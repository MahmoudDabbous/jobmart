import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './Job';

@Entity({ name: 'job_positions' })
export class JobPosition {
  @PrimaryGeneratedColumn()
  jobPositionId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Job, (job) => job.jobPosition)
  jobs: Job[];
}
