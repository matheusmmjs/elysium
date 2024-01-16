import { Module } from '@nestjs/common';
import { AttendingService } from './attending.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendingSchema } from './schema/attending.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Attending',
        schema: AttendingSchema,
      },
    ]),
  ],
  providers: [AttendingService],
  exports: [AttendingService],
})
export class AttendingModule {}
