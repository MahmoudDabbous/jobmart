import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { User } from './User';
import { Application } from './Application';
import { Document } from './Document';

@Entity({ name: 'applicants' })
export class Applicant {
  @PrimaryGeneratedColumn()
  applicantId: number;

  @OneToOne(() => User, (user) => user.applicant, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Education, (education) => education.applicant)
  educations: Education[];

  @OneToMany(() => Experience, (experience) => experience.applicant)
  experiences: Experience[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];

  @ManyToMany(() => Document, (document) => document.applicant)
  documents: Document[];
}
