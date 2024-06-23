import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Test } from './Test';

enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  @Column()
  questionText: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @Column('json')
  options: string[];

  @Column()
  correctAnswer: string;

  @ManyToMany(() => Test, (test) => test.questions)
  tests: Test[];
}
