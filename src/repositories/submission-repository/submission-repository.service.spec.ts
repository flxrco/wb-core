import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionRepositoryService } from './submission-repository.service';

describe('SubmissionRepositoryService', () => {
  let service: SubmissionRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionRepositoryService],
    }).compile();

    service = module.get<SubmissionRepositoryService>(SubmissionRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
