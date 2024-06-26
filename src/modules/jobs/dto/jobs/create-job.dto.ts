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
  jobCategoryId?: number;

  @IsNumber()
  @IsOptional()
  jobPositionId?: number;

  @IsNumber()
  @IsOptional()
  jobPlatformId?: number;
}
