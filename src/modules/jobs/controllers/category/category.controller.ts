import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { UpdateCategoryDto } from '../../dto/category/update-categort.dto';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe())
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), new ParseIntPipe())
    limit: number = 10,
  ) {
    return await this.categoryService.findAll({ page, limit });
  }

  @Get(':categoryId')
  async findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.findOne(categoryId);
  }

  @Patch(':categoryId')
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  async remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.delete(categoryId);
  }

  @Get(':categoryId/jobs')
  async findJobs(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.findJobs(categoryId);
  }
}
