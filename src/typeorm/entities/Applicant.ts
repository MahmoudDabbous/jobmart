// import { Application } from './Application';
import { Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { User } from './User';

@Entity({ name: 'applicants' })
export class Applicant {
  @OneToMany(() => User, (user) => user.id)
  @PrimaryColumn('uuid')
  user: User;

  // @OneToMany(() => Application, (application) => application.id)
  // applications: Application[];

  @OneToMany(() => Education, (education) => education.id)
  educations: Education[];

  @OneToOne(() => Experience, (experience) => experience.id)
  experiences: Experience[];
}
