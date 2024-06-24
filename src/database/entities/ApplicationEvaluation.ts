import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Application } from './Application';
import { Recruiter } from './Recruiter';

@Entity({ name: 'application_evaluations' })
export class ApplicationEvaluation {
  @PrimaryGeneratedColumn()
  applicantEvaluationId: number;

  @Column()
  notes: string;

  @Column()
  recruiterId: number;

  @Column()
  applicationId: number;

  @Column()
  hired: boolean;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.applicationEvaluations)
  recruiter: Recruiter;

  // @ManyToOne(
  //   () => Application,
  //   (application) => application.applicationEvaluations,
  // )
  // application: Application;
}
