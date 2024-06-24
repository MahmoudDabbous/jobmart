import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from 'src/database/entities/Test';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dtos/create-test.dto';
import { UpdateTestDto } from './dtos/update-test.dto';
import { Question } from 'src/database/entities/Question';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    console.log('1', createTestDto);
    const { questionIds, ...testData } = createTestDto;
    console.log('2', questionIds + ' ' + testData);
    // Create the test entity
    const test = this.testRepository.create(testData);
    console.log('3', test);
    // Find all questions by their ids
    const questions = await this.questionRepository.findByIds(questionIds);
    console.log('4', questions);
    // Assign questions to the test
    test.questions = questions;
    console.log('5', test);
    // Save the test with its questions
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

  async remove(id: number): Promise<void> {
    const result = await this.testRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
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

  async getTestApplications(id: number) {
    const test = await this.testRepository.findOne({
      where: { testId: id },
      relations: ['applications'],
    });
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return test.applications;
  }
}
