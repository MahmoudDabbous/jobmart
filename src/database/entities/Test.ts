import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Question } from './Question';
import { Application } from './Application';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  testId: number;

  @Column()
  duration: number;

  @Column()
  maxScore: number;

  @ManyToMany(() => Question, (question) => question.tests)
  @JoinTable({
    name: 'test_questions',
    joinColumn: {
      name: 'test',
      referencedColumnName: 'testId',
    },
    inverseJoinColumn: {
      name: 'question',
      referencedColumnName: 'questionId',
    },
  })
  questions: Question[];

  @OneToMany(() => Application, (application) => application.test)
  applications: Application[];
}
