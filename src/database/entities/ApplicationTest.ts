import {
  Column,
  Entity,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './Application';
// import { Test } from './Test';

@Entity({ name: 'application_tests' })
export class ApplicationTest {
  @PrimaryGeneratedColumn()
  applicationTestId: number;

  @Column()
  testId: number;

  @Column()
  applicationId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  // @ManyToOne(() => Test, (test) => test.applicationTests)
  // test: Test;

  @ManyToOne(() => Application, (application) => application.applicationTests)
  application: Application;
}
