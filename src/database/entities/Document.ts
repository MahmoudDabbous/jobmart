import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './Application';
import { Applicant } from './Applicant';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @UpdateDateColumn()
  lastUpdated: Date;

  @ManyToOne(() => Application, (application) => application.document)
  @JoinColumn()
  application: Application;

  @ManyToOne(() => Applicant, (applicant) => applicant.documents)
  applicant: Applicant;
}
