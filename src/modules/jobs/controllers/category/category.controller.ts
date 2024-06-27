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
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { UpdateCategoryDto } from '../../dto/category/update-categort.dto';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe())
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), new ParseIntPipe())
    limit: number = 10,
  ) {
    return await this.categoryService.findAll({ page, limit });
  }

  @Get(':categoryId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.findOne(categoryId);
  }

  @Patch(':categoryId')
  @UseGuards(AdminGuard)
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(AdminGuard)
  async remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.delete(categoryId);
  }

  @Get(':categoryId/jobs')
  @UseGuards(JwtAuthGuard)
  async findJobs(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.findJobs(categoryId);
  }
}
