import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './Application';
// import { ApplicationDocument } from './ApplicationDocument';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @UpdateDateColumn()
  lastUpdated: Date;

  // @OneToMany(
  //   () => ApplicationDocument,
  //   (applicationDocument) => applicationDocument.document,
  // )
  // applicationDocuments: ApplicationDocument[];

  @OneToMany(() => Application, (application) => application.document)
  applications: Application[];
}
