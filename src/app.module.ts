import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ReceptiveModule } from './receptive/receptive.module';
import { ActiveModule } from './active/active.module';

@Module({
  imports: [HealthModule, ReceptiveModule, ActiveModule],
})
export class AppModule {}
