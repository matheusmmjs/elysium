import { Controller, Get, MessageEvent, Param, Sse } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { Observable, defer, map, repeat } from 'rxjs';

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

  @Sse(':id/sse')
  sse(@Param('id') id: string): Observable<MessageEvent> {
    return defer(() => this.historicService.findOne(id)).pipe(
      repeat({
        delay: 5000,
      }),
      map((historyc) => ({
        type: 'message',
        data: historyc,
      })),
    );
  }
}
