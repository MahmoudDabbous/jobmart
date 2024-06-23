import { ApplicationTest } from './ApplicationTest';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recruiter } from './Recruiter';
// import { Test } from './Test';

@Entity({ name: 'answers' })
export class Answers {
  @PrimaryGeneratedColumn()
  answerId: number;

  @Column()
  applicationTestId: number;

  @Column()
  recruiterId: number;

  @Column()
  totalGrades: number;

  @Column()
  pass: boolean;

  @Column()
  answerDetails: string;

  @ManyToOne(
    () => ApplicationTest,
    (applicationTest) => applicationTest.answers,
  )
  applicationTest: ApplicationTest;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.answers)
  recruiter: Recruiter;

  // @ManyToOne(() => Test, (test) => test.answers)
  // test: Test;
}
