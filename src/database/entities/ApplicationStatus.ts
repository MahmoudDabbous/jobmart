import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationStatusChange } from './ApplicationStatusChange';

@Entity({ name: 'application_statuses' })
export class ApplicationStatus {
  @PrimaryGeneratedColumn()
  applicationStatusId: number;

  @Column()
  status: string;

  @OneToMany(
    () => ApplicationStatusChange,
    (applicationStatusChange) => applicationStatusChange.applicationStatus,
  )
  applicationStatusChanges: ApplicationStatusChange[];
}
