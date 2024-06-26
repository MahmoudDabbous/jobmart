import { Controller, Delete, Get, Param } from '@nestjs/common';
import { DocumentService } from '../services/document.service';

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
}
