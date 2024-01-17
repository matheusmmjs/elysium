import { Module } from '@nestjs/common';
import { ReceptiveService } from './receptive.service';
import { ReceptiveController } from './receptive.controller';
import { HistoricModule } from './../historic/historic.module';
import { AttendingModule } from './../attending/attending.module';
import { SessionModule } from './../session/session.module';

@Module({
  controllers: [ReceptiveController],
  providers: [ReceptiveService],
  imports: [HistoricModule, AttendingModule, SessionModule],
})
export class ReceptiveModule {}
