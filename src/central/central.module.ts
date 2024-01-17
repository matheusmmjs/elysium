import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentralController } from './central.controller';
import { CentralService } from './central.service';
import { CentralSchema } from './schema/central.schema';
import { TenantCentralService } from './tenant-central.service';
import { TenantCentralSchema } from './schema/tenant-central.schema';
import { TenantCentralController } from './tenant-central.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Central', schema: CentralSchema },
      { name: 'TenantCentral', schema: TenantCentralSchema },
    ]),
  ],
  controllers: [CentralController, TenantCentralController],
  providers: [CentralService, TenantCentralService],
  exports: [TenantCentralService, CentralService],
})
export class CentralModule {}
