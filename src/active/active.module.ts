import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { HistoricModule } from './../historic/historic.module';

@Module({
  controllers: [ActiveController],
  providers: [ActiveService],
  imports: [HistoricModule],
})
export class ActiveModule {}
