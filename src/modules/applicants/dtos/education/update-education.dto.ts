import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationDto } from './create-education';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}
