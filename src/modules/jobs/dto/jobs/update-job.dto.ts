import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '../category/create-category.dto';

export class UpdateJobDto extends PartialType(CreateCategoryDto) {}
