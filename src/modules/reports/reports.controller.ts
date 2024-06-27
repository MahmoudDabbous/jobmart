import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly statusService: ReportsService) {}
  @Get()
  @UseGuards(AdminGuard)
  getReports() {
    return this.statusService.getReports();
  }
}
