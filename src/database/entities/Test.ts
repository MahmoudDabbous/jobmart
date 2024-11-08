import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';
import { Application } from './Application';
import { Expose } from 'class-transformer';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  testId: number;

  @Column()
  testCode: string;

  @Column()
  duration: number;

  @Column()
  maxScore: number;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @OneToMany(() => Application, (application) => application.test)
  applications: Application[];

  @Expose()
  applicationCount: number;
}
