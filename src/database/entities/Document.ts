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

  @ManyToOne(() => Application, (application) => application.document, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  application: Application;

  @ManyToOne(() => Applicant, (applicant) => applicant.documents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  applicant: Applicant;
}
