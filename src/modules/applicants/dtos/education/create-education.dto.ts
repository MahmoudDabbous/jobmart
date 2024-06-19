import { IsString, IsDate, IsNotEmpty } from 'class-validator';

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

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  endDate?: Date;

  @IsString()
  @IsNotEmpty()
  grade: string;
}
