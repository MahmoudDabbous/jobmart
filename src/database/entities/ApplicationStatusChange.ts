import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationStatus } from './ApplicationStatus';
// import { Application } from './Application';

@Entity({ name: 'application_status_changes' })
export class ApplicationStatusChange {
  @PrimaryGeneratedColumn()
  applicationStatusChangeId: number;

  @Column()
  dateChanged: Date;

  @Column()
  applicationStatusId: number;

  @Column()
  applicationId: number;

  @ManyToOne(
    () => ApplicationStatus,
    (applicationStatus) => applicationStatus.applicationStatusChanges,
  )
  applicationStatus: ApplicationStatus;

  // @ManyToOne(
  //   () => Application,
  //   (application) => application.applicationStatusChanges,
  // )
  // application: Application;
}
