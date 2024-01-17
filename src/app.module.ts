import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ReceptiveModule } from './receptive/receptive.module';
import { ActiveModule } from './active/active.module';
import { HistoricModule } from './historic/historic.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendingModule } from './attending/attending.module';
import { SessionModule } from './session/session.module';
import { CentralModule } from './central/central.module';
import configCommon from './common/config.common';

@Module({
  imports: [
    HealthModule,
    ReceptiveModule,
    ActiveModule,
    MongooseModule.forRoot(
      `mongodb+srv://${configCommon.mongoDbAtlasUser}:${configCommon.mongoDbAtlasPassword}@cluster0.hgfatln.mongodb.net/`,
    ),
    HistoricModule,
    AttendingModule,
    SessionModule,
    CentralModule,
  ],
})
export class AppModule {}
