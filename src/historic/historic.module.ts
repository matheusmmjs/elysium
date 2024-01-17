import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message.schema';
import { HistoricSchema } from './schema/historic.schema';
import { CentralModule } from './../central/central.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema,
      },
      {
        name: 'Historic',
        schema: HistoricSchema,
      },
    ]),
    CentralModule,
  ],
  controllers: [HistoricController],
  providers: [HistoricService],
  exports: [HistoricService],
})
export class HistoricModule {}
