import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PositionService } from '../../services/position/position.service';
import { CreatePositionDto } from '../../dto/position/create-position.dto';
import { UpdatePositionDto } from '../../dto/position/update-position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAll() {
    return await this.positionService.findAll();
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
