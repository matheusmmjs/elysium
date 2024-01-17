import { Test, TestingModule } from '@nestjs/testing';
import { CentralController } from '../central.controller';
import { CentralService } from '../central.service';

describe('CentralController', () => {
  let controller: CentralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentralController],
      providers: [CentralService],
    }).compile();

    controller = module.get<CentralController>(CentralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
