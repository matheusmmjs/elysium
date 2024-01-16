import { Test, TestingModule } from '@nestjs/testing';
import { AttendingService } from './attending.service';

describe('AttendingService', () => {
  let service: AttendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendingService],
    }).compile();

    service = module.get<AttendingService>(AttendingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
