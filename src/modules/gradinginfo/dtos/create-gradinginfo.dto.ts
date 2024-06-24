import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateGradingInfoDto {
  @IsNumber()
  recruiterId: number;

  @IsNumber()
  totalGrades: number;

  @IsString()
  @IsNotEmpty()
  passFailStatus: string;

  @IsString()
  answerDetails: string;

  @IsNumber()
  applicationId: number;
}
