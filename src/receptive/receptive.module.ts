import { Module } from '@nestjs/common';
import { ReceptiveService } from './receptive.service';
import { ReceptiveController } from './receptive.controller';

@Module({
  controllers: [ReceptiveController],
  providers: [ReceptiveService],
})
export class ReceptiveModule {}
