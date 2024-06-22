import {
  IsArray,
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
  @IsArray({ each: true })
  @IsOptional()
  jobCategoryId?: Array<number>;

  @IsNumber()
  @IsArray({ each: true })
  @IsOptional()
  jobPositionId?: Array<number>;

  @IsNumber()
  @IsArray({ each: true })
  @IsOptional()
  jobPlatformId?: Array<number>;

  @IsNumber()
  @IsOptional()
  processId?: number;
}
