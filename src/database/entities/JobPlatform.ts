import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './Job';

@Entity({ name: 'job_platforms' })
export class JobPlatform {
  @PrimaryGeneratedColumn()
  jobPlatformId: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Job, (job) => job.jobPlatform)
  jobs: Job[];
}
