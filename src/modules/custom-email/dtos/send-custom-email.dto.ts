import { IsNotEmpty, IsString } from 'class-validator';

export class SendCustomEmailDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
