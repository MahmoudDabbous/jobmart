import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './Application';
import { InterviewNote } from './InterviewNote';

@Entity({ name: 'interviews' })
export class Interview {
  @PrimaryGeneratedColumn()
  interviewId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  applicationId: number;

  @ManyToOne(() => Application, (application) => application.interviews)
  application: Application;

  @OneToMany(() => InterviewNote, (interviewNote) => interviewNote.interview)
  interviewNotes: InterviewNote[];
}
