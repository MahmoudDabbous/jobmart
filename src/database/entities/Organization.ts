import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './Job';

@Entity({ name: 'organizations' })
export class Organization {
  @PrimaryGeneratedColumn()
  organizationId: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Job, (job) => job.organization)
  jobs: Job[];
}
