import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.js';

@Entity({ name: 'educations' })
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  fieldOfStudy: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  grade: string;
}
