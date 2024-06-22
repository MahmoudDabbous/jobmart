import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './Job';

@Entity({ name: 'job_categories' })
export class JobCategory {
  @PrimaryGeneratedColumn()
  jobCategoryId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Job, (job) => job.jobCategory)
  jobs: Job[];
}
