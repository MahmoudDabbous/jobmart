import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';

enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;

  @IsNumber()
  testId: number;
}
