import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { User } from './User';
// import { Application } from './Application';
import { ApplicationDocument } from './ApplicationDocument';

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

  // @OneToMany(() => Application, (application) => application.applicant)
  // applications: Application[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ApplicationDocument,
    (applicationDocument) => applicationDocument.applicant,
  )
  applicationDocuments: ApplicationDocument[];
}
