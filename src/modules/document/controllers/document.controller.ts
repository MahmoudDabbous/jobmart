import {
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthGuard from 'src/modules/auth/guards/jwt-auth.guard';
import { createReadStream } from 'fs';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('applicant/:applicantId')
  @UseGuards(AdminGuard)
  async findAllApplicantDocuments(@Param('applicantId') applicantId: number) {
    return await this.documentService.findAllApplicantDocuments(applicantId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findAllDocuments(@Req() request) {
    return await this.documentService.findAllApplicantDocuments(
      request.user.userId,
    );
  }

  @Get(':documentId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('documentId') documentId: number) {
    return await this.documentService.findOne(documentId);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('documentId') documentId: number) {
    return await this.documentService.remove(documentId);
  }

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('resume', { dest: 'uploads' }))
  async uploadDocument(
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
    @Req() request,
  ) {
    return await this.documentService.uploadDocument(
      request.user.userId,
      document,
    );
  }

  @Get(':documentId/download')
  @UseGuards(JwtAuthGuard)
  async downloadDocument(
    @Param('documentId', ParseIntPipe) documentId: number,
  ) {
    const doc = await this.documentService.downloadDocument(documentId);
    const file = createReadStream(doc.url);

    return new StreamableFile(file, {
      length: doc.size,
      type: 'application/pdf',
      disposition: 'attachment; filename="' + doc.name + '.pdf"',
    });
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  async deleteDocument(@Param('documentId') documentId: number) {
    return await this.documentService.remove(documentId);
  }
}
