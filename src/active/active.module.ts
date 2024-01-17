import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { HistoricModule } from './../historic/historic.module';
import { CentralModule } from './../central/central.module';

@Module({
  controllers: [ActiveController],
  providers: [ActiveService],
  imports: [HistoricModule, CentralModule],
})
export class ActiveModule {}
