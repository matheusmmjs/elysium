import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CentralService } from './central.service';
import { CreateCentralDto } from './dto/create-central.dto';
import { UpdateCentralDto } from './dto/update-central.dto';

@Controller({
  version: '1',
  path: 'centrals',
})
export class CentralController {
  constructor(private readonly centralService: CentralService) {}

  @Post()
  create(@Body() createCentralDto: CreateCentralDto): Promise<void> {
    return this.centralService.create(createCentralDto);
  }

  @Get()
  findAll() {
    return this.centralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centralService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCentralDto: UpdateCentralDto) {
    return this.centralService.update(id, updateCentralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.centralService.remove(id);
  }
}
