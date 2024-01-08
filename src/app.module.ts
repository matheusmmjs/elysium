import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ReceptiveModule } from './receptive/receptive.module';
import { ActiveModule } from './active/active.module';
import { HistoricModule } from './historic/historic.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HealthModule,
    ReceptiveModule,
    ActiveModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODBATLAS_USER}:${process.env.MONGODBATLAS_PASSWORD}@cluster0.hgfatln.mongodb.net/`,
    ),
    HistoricModule,
  ],
})
export class AppModule {}
