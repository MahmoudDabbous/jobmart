import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Test } from './Test';
import { ProcessStep } from './ProcessStep';

@Entity({ name: 'steps' })
export class Step {
  @PrimaryGeneratedColumn()
  stepId: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToMany(() => Test, (test) => test.steps)
  tests: Test[];

  @OneToMany(() => ProcessStep, (processStep) => processStep.step)
  processSteps: ProcessStep[];
}
