import { Module } from '@nestjs/common';
import { ReceptiveService } from './receptive.service';
import { ReceptiveController } from './receptive.controller';
import { HistoryModule } from './../history/history.module';

@Module({
  controllers: [ReceptiveController],
  providers: [ReceptiveService],
  imports: [HistoryModule],
})
export class ReceptiveModule {}
