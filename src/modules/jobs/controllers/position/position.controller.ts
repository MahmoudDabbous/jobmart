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
import { PositionService } from '../../services/position/position.service';
import { CreatePositionDto } from '../../dto/position/create-position.dto';
import { UpdatePositionDto } from '../../dto/position/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return await this.positionService.findAll({ page, limit });
  }

  @Get(':positionId')
  async findOne(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.findOne(positionId);
  }

  @Get(':positionId/jobs')
  async findJobs(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.findJobs(positionId);
  }

  @Post()
  async create(@Body() createPositionDto: CreatePositionDto) {
    return await this.positionService.create(createPositionDto);
  }

  @Patch(':positionId')
  async update(
    @Param('positionId', ParseIntPipe) positionId: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return await this.positionService.update(positionId, updatePositionDto);
  }

  @Delete(':positionId')
  async remove(@Param('positionId', ParseIntPipe) positionId: number) {
    return await this.positionService.delete(positionId);
  }
}
