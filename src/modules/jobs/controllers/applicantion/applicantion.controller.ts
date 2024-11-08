import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicantionService } from '../../services/applicantion/applicantion.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { AdminGuard } from 'src/common/guards/admin.guard';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('applications')
export class ApplicantionController {
  constructor(private readonly applicantionService: ApplicantionService) {}

  @Get(':applicationId')
  @UseGuards(JwtAuthGuard)
  async getApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicantionService.findOne(applicationId);
  }

  @Get()
  @UseGuards(AdminGuard)
  async getApplications(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ) {
    return await this.applicantionService.findAll({ limit, page });
  }

  @Get('job/:jobId')
  @UseGuards(AdminGuard)
  async getJobApplications(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  ) {
    return await this.applicantionService.findJobApplications(jobId, {
      limit,
      page,
    });
  }

  @Delete(':applicationId')
  @UseGuards(AdminGuard)
  async deleteApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicantionService.delete(applicationId);
  }

  @Post(':applicationId/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('resume', { dest: 'uploads' }))
  async uploadDocument(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'application/pdf',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    document: Express.Multer.File,
  ) {
    return await this.applicantionService.uploadDocument(
      applicationId,
      document,
    );
  }

  @Get(':applicationId/download')
  @UseGuards(JwtAuthGuard)
  async downloadDocument(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    const doc = await this.applicantionService.downloadDocument(applicationId);
    const file = createReadStream(doc.url);

    return new StreamableFile(file, {
      length: doc.size,
      type: 'application/pdf',
      disposition: 'attachment; filename="' + doc.name + '.pdf"',
    });
  }

  @Patch(':applicationId/attach/:documentId')
  @UseGuards(JwtAuthGuard)
  async attachDocumentToApplication(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
  ) {
    return await this.applicantionService.attachDocumentToApplication(
      applicationId,
      documentId,
    );
  }

  @Post('assign-test')
  @UseGuards(AdminGuard)
  async assignTest(@Body() { applicationId, testId }) {
    return await this.applicantionService.assignTest(applicationId, testId);
  }
}
