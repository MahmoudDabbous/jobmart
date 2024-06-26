import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantionController } from './applicantion.controller';

describe('ApplicantionController', () => {
  let controller: ApplicantionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantionController],
    }).compile();

    controller = module.get<ApplicantionController>(ApplicantionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
