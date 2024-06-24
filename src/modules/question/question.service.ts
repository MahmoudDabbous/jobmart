import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/database/entities/Question';
import { Test } from 'src/database/entities/Test';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const test = await this.testRepository.findOne({
      where: { testId: createQuestionDto.testId },
    });
    if (!test) {
      throw new NotFoundException(
        `Test with ID ${createQuestionDto.testId} not found`,
      );
    }
    const question = this.questionRepository.create({
      ...createQuestionDto,
      test: test,
    });
    return await this.questionRepository.save(question);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<Question>> {
    return paginate<Question>(this.questionRepository, { page, limit });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { questionId: id },
      relations: ['test'],
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(id);
    if (
      updateQuestionDto.testId &&
      updateQuestionDto.testId !== question.test.testId
    ) {
      const newTest = await this.testRepository.findOne({
        where: { testId: updateQuestionDto.testId },
      });
      if (!newTest) {
        throw new NotFoundException(
          `Test with ID ${updateQuestionDto.testId} not found`,
        );
      }
      question.test = newTest;
    }
    Object.assign(question, updateQuestionDto);
    return await this.questionRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
}
