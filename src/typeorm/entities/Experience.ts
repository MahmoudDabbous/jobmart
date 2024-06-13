import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'experiences' })
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;
}
