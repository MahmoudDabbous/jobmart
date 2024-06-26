import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Interview } from './Interview';
// import { Recruiter } from './Recruiter';

@Entity({ name: 'interview_notes' })
export class InterviewNote {
  @PrimaryGeneratedColumn()
  interviewNoteId: number;

  @Column()
  interviewId: number;

  @Column()
  recruiterId: number;

  @Column()
  pass: boolean;

  @Column()
  notes: string;

  @ManyToOne(() => Interview, (interview) => interview.interviewNotes)
  interview: Interview;

  // @ManyToOne(() => Recruiter, (recruiter) => recruiter.interviewNotes)
  // recruiter: Recruiter;
}
