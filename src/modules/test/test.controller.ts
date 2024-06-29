import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dtos/create-test.dto';
import { UpdateTestDto } from './dtos/update-test.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.testService.findAll(page, limit);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string) {
    const test = await this.testService.findOne(+id);
    return {
      ...test,
      applicationCount: test.applicationCount,
    };
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }

  @Get(':id/questions')
  @UseGuards(JwtAuthGuard)
  getTestQuestions(@Param('id') id: string) {
    return this.testService.getTestQuestions(+id);
  }
}
