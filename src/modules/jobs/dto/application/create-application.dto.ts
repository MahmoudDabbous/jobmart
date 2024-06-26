import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsNumber()
  @IsOptional()
  testId?: number;

  @IsNumber()
  @IsOptional()
  gradingInfoId?: number;

  @IsNumber()
  @IsOptional()
  applicantId?: number;

  @IsNumber()
  @IsOptional()
  documentId?: number;
}
