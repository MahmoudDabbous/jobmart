import { IsNumber, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  duration: number;

  @IsString()
  testCode: string;

  @IsNumber()
  maxScore: number;
}
