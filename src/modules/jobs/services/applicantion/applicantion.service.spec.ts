import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantionService } from './applicantion.service';

describe('ApplicantionService', () => {
  let service: ApplicantionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicantionService],
    }).compile();

    service = module.get<ApplicantionService>(ApplicantionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
