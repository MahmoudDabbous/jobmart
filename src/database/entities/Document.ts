import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationDocument } from './ApplicationDocument';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @Column()
  name: string;

  @Column({ type: 'bytea' })
  documentContent: Buffer;

  @Column()
  url: string;

  @Column()
  lastUpdated: Date;

  @OneToMany(
    () => ApplicationDocument,
    (applicationDocument) => applicationDocument.document,
  )
  applicationDocuments: ApplicationDocument[];
}
