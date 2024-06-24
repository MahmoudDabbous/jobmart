import { PartialType } from '@nestjs/mapped-types';
import { CreateGradingInfoDto } from './create-gradinginfo.dto';

export class UpdateGradingInfoDto extends PartialType(CreateGradingInfoDto) {}
