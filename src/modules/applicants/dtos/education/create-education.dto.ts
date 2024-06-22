import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  endDate?: Date;

  @IsString()
  @IsNotEmpty()
  grade: string;
}
