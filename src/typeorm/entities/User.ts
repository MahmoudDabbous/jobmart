import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Applicant } from './Applicant';

enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.APPLICANT,
  })
  role: UserRole;

  @OneToOne(() => Applicant, (applicant) => applicant.user)
  applicant: Applicant;
}
