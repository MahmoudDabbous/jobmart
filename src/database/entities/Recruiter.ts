import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEvaluation } from './ApplicationEvaluation';
import { Process } from './Process';
import { InterviewNote } from './InterviewNote';
import { Answers } from './Answer';

@Entity({ name: 'recruiters' })
export class Recruiter {
  @PrimaryGeneratedColumn()
  recruiterId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Process, (process) => process.recruiter)
  processes: Process[];

  @OneToMany(() => InterviewNote, (interviewNote) => interviewNote.recruiter)
  interviewNotes: InterviewNote[];

  @OneToMany(() => Answers, (answers) => answers.recruiter)
  answers: Answers[];

  @OneToMany(
    () => ApplicationEvaluation,
    (applicationEvaluation) => applicationEvaluation.recruiter,
  )
  applicationEvaluations: ApplicationEvaluation[];
}
