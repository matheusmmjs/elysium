import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTenantCentralDto } from './dto/create-tenant-central.dto';
import { UpdateTenantCentralDto } from './dto/update-tenant-central.dto';
import { TenantCentralService } from './tenant-central.service';

@Controller({
  version: '1',
  path: 'tenant-centrals',
})
export class TenantCentralController {
  constructor(private readonly tenantCentralService: TenantCentralService) {}

  @Post()
  create(
    @Body() createTenantCentralDto: CreateTenantCentralDto,
  ): Promise<void> {
    return this.tenantCentralService.create(createTenantCentralDto);
  }

  @Get()
  findAll() {
    return this.tenantCentralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantCentralService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenantCentralDto: UpdateTenantCentralDto,
  ) {
    return this.tenantCentralService.update(id, updateTenantCentralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tenantCentralService.remove(id);
  }
}
