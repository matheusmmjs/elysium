import { Test, TestingModule } from '@nestjs/testing';
import { ReceptiveController } from '../receptive.controller';
import { ReceptiveService } from '../receptive.service';

describe('ReceptiveController', () => {
  let controller: ReceptiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptiveController],
      providers: [ReceptiveService],
    }).compile();

    controller = module.get<ReceptiveController>(ReceptiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
