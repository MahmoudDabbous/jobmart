import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationTest } from './ApplicationTest';
import { Step } from './Step';
import { Answers } from './Answer';

@Entity({ name: 'tests' })
export class Test {
  @PrimaryGeneratedColumn()
  testId: number;

  @Column()
  code: string;

  @Column()
  duration: number;

  @Column()
  maxScore: number;

  @OneToMany(() => ApplicationTest, (applicationTest) => applicationTest.test)
  applicationTests: ApplicationTest[];

  @ManyToMany(() => Step, (step) => step.tests)
  @JoinTable({
    name: 'test_steps',
    joinColumn: {
      name: 'testId',
      referencedColumnName: 'testId',
    },
    inverseJoinColumn: {
      name: 'stepId',
      referencedColumnName: 'stepId',
    },
  })
  steps: Step[];

  @OneToMany(() => Answers, (answers) => answers.test)
  answers: Answers[];
}
