import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCategory } from 'src/database/entities/JobCategory';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../../dto/category/update-categort.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(JobCategory)
    private readonly categoryRepository: Repository<JobCategory>,
  ) {}

  async create(data: CreateCategoryDto) {
    return await this.categoryRepository.save(data);
  }

  async update(jobCategoryId: number, data: UpdateCategoryDto) {
    await this.categoryRepository.update(jobCategoryId, data);
    return await this.categoryRepository.findOne({
      where: { jobCategoryId },
    });
  }

  async delete(jobCategoryId: number) {
    await this.categoryRepository.delete(jobCategoryId);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(jobCategoryId: number) {
    return await this.categoryRepository.findOne({
      where: { jobCategoryId },
    });
  }

  async findJobs(jobCategoryId: number) {
    return await this.categoryRepository.findOne({
      where: { jobCategoryId },
      relations: ['jobs'],
    });
  }
}
