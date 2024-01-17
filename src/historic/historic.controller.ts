import { Controller, Get, MessageEvent, Param, Sse } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { Observable, defer, map, repeat } from 'rxjs';

@Controller({
  version: '1',
  path: 'centrals/:centralId',
})
export class HistoricController {
  constructor(private readonly historicService: HistoricService) {}

  @Get('/historic/:id')
  findOne(@Param('centralId') centralId: string, @Param('id') id: string) {
    return this.historicService.findOne(centralId, id);
  }

  @Sse('/historic/:id/sse')
  sse(
    @Param('centralId') centralId: string,
    @Param('id') id: string,
  ): Observable<MessageEvent> {
    return defer(() => this.historicService.findOne(centralId, id)).pipe(
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
