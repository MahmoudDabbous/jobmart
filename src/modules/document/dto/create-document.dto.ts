import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsString()
  @IsNotEmpty()
  extension: string;
  @IsNumber()
  @IsNotEmpty()
  size: number;
  @IsNumber()
  @IsNotEmpty()
  applicantId: number;
  @IsNumber()
  @IsNotEmpty()
  applicationId: number;
}
