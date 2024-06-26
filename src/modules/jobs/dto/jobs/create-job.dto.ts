import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  jobStartDate?: Date;

  @IsNumber()
  numberOfVacancies?: number;

  @IsNumber()
  @IsOptional()
  jobCategory?: number;

  @IsNumber()
  @IsOptional()
  jobPosition?: number;

  @IsNumber()
  @IsOptional()
  jobPlatform?: number;
}
