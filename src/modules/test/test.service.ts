import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dtos/create-test.dto';
import { UpdateTestDto } from './dtos/update-test.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Test } from 'src/database/entities/Test';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testRepository.create(createTestDto);
    return await this.testRepository.save(test);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<Test>> {
    return paginate<Test>(this.testRepository, { page, limit });
  }

  async findOne(id: number): Promise<Test> {
    const test = await this.testRepository.findOne({ where: { testId: id } });
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return test;
  }

  async update(id: number, updateTestDto: UpdateTestDto): Promise<Test> {
    await this.findOne(id);
    await this.testRepository.update(id, updateTestDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.testRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return { id };
  }

  async getTestQuestions(id: number) {
    const test = await this.testRepository.findOne({
      where: { testId: id },
      relations: ['questions'],
    });
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return test.questions;
  }
}
