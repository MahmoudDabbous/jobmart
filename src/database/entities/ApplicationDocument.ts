import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Application } from './Application';
import { Applicant } from './Applicant';
// import { Document } from './Document';

@Entity({ name: 'application_documents' })
export class ApplicationDocument {
  @PrimaryGeneratedColumn()
  applicationDocumentId: number;

  @Column()
  applicationId: number;

  @Column()
  documentId: number;

  @Column()
  applicantId: number;

  // @ManyToOne(
  //   () => Application,
  //   (application) => application.applicationDocuments,
  // )
  // application: Application;

  // @ManyToOne(() => Document, (document) => document.applicationDocuments)
  // document: Document;

  @ManyToOne(() => Applicant, (applicant) => applicant.applicationDocuments)
  applicant: Applicant;
}
