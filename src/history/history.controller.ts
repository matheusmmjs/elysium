import { Controller } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller({
  version: '1',
  path: 'history',
})
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
}
