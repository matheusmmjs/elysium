import { Test, TestingModule } from '@nestjs/testing';
import { ReceptiveService } from '../receptive.service';

describe('ReceptiveService', () => {
  let service: ReceptiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptiveService],
    }).compile();

    service = module.get<ReceptiveService>(ReceptiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
