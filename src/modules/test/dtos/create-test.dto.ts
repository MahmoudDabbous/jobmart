import { IsNumber, IsArray } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  duration: number;

  @IsNumber()
  maxScore: number;

  @IsArray()
  @IsNumber({}, { each: true })
  questionIds: number[];
}
