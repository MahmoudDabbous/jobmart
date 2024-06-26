import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/database/entities/Document';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return await this.documentRepository.save({
      name: createDocumentDto.name,
      url: createDocumentDto.url,
      extension: createDocumentDto.extension,
      size: createDocumentDto.size,
      applicant: { applicantId: createDocumentDto.applicantId },
      application: { applicationId: createDocumentDto.applicationId },
    });
  }

  async findAllApplicantDocuments(applicantId: number) {
    return await this.documentRepository.find({
      where: { applicant: { applicantId } },
    });
  }

  async findOne(documentId: number) {
    return await this.documentRepository.findOne({ where: { documentId } });
  }

  async remove(documentId: number) {
    return await this.documentRepository.delete({ documentId });
  }
}
