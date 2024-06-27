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

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('applicant/:applicantId')
  async findAllApplicantDocuments(@Param('applicantId') applicantId: number) {
    return await this.documentService.findAllApplicantDocuments(applicantId);
  }

  @Get(':documentId')
  async findOne(@Param('documentId') documentId: number) {
    return await this.documentService.findOne(documentId);
  }

  @Delete(':documentId')
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

  @Get('download/:documentId')
  @UseGuards(JwtAuthGuard)
  async downloadDocument(
    @Param('applicationId', ParseIntPipe) applicantId: number,
  ) {
    const doc = await this.documentService.downloadDocument(applicantId);
    const file = createReadStream(doc.url);

    return new StreamableFile(file, {
      length: doc.size,
      type: 'application/pdf',
      disposition: 'attachment; filename="' + doc.name + '.pdf"',
    });
  }
}
