import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from 'src/database/entities/Document';
import { ApplicantsService } from 'src/modules/applicants/services/applicants/applicants.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly applicantService: ApplicantsService,
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
    const applicant = await this.applicantService.findOne(applicantId);
    return await this.documentRepository.find({
      where: { applicant: { applicantId: applicant.applicantId } },
      relations: ['applicant', 'applicant.user', 'application'],
    });
  }

  async findOne(documentId: number) {
    return await this.documentRepository.findOne({
      where: { documentId },
      relations: ['applicant', 'application', 'applicant.user'],
    });
  }

  async remove(documentId: number) {
    const doc = await this.documentRepository.delete({ documentId });
    return doc.affected === 1
      ? { message: 'Document deleted' }
      : { message: 'Document not found' };
  }

  async uploadDocument(applicantId: number, document: Express.Multer.File) {
    const applicant = await this.applicantService.findOne(applicantId);
    return await this.documentRepository.save({
      name: document.originalname,
      url: document.path,
      extension: document.mimetype,
      size: document.size,
      applicant: { applicantId: applicant.applicantId },
    });
  }

  async downloadDocument(documentId: number) {
    return await this.documentRepository.findOne({ where: { documentId } });
  }

  async attachToApplication(applicationId: number, documentId: number) {
    return await this.documentRepository.update(
      { documentId },
      { application: { applicationId } },
    );
  }
}
