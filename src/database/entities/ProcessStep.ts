import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Step } from './Step';
import { Process } from './Process';

@Entity({ name: 'process_steps' })
export class ProcessStep {
  @PrimaryGeneratedColumn()
  processStepId: number;

  @Column()
  stepId: number;

  @Column()
  processId: number;

  @Column()
  status: string;

  @Column()
  priority: number;

  @ManyToOne(() => Step, (step) => step.processSteps)
  step: Step;

  @ManyToOne(() => Process, (process) => process.processSteps)
  process: Process;
}
