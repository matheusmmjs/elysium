import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantCentralDto } from './create-tenant-central.dto';

export class UpdateTenantCentralDto extends PartialType(
  CreateTenantCentralDto,
) {}
