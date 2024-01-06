import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller({
  version: '1',
  path: 'history',
})
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.get(id);
  }
}
