import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { CreateJobDto } from '../../dto/jobs/create-job.dto';
import { UpdateCategoryDto } from '../../dto/category/update-categort.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateJobDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':categoryId')
  async findOne(categoryId: number) {
    return await this.categoryService.findOne(categoryId);
  }

  @Patch(':categoryId')
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    categoryId: number,
  ) {
    return await this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  async remove(categoryId: number) {
    return await this.categoryService.delete(categoryId);
  }

  @Get(':categoryId/jobs')
  async findJobs(categoryId: number) {
    return await this.categoryService.findJobs(categoryId);
  }
}
