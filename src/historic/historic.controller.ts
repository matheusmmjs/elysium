import { Controller, Get, Param } from '@nestjs/common';
import { HistoricService } from './historic.service';

@Controller({
  version: '1',
  path: 'historic',
})
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicService.findOne(id);
  }
}
