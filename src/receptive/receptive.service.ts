import { Injectable, Logger } from '@nestjs/common';
import { CreateReceptiveDto } from './dto/create-receptive.dto';
import { HistoryService } from './../history/history.service';

@Injectable()
export class ReceptiveService {
  private readonly logger = new Logger(ReceptiveService.name);
  private activesSessions: Map<string, NodeJS.Timeout> = new Map();

  constructor(private readonly historyService: HistoryService) {}

  create(createReceptiveDto: CreateReceptiveDto) {
    try {
      this.openSession(createReceptiveDto.WaId);
      this.historyService.create(createReceptiveDto.WaId, {
        sender: createReceptiveDto.From,
        recipient: createReceptiveDto.To,
        content: createReceptiveDto.Body,
        status: createReceptiveDto.SmsStatus,
        name: createReceptiveDto.ProfileName,
      });
    } catch (error) {
      throw error;
    }
  }

  private openSession(clienteId: string): void {
    const timeOfSession = parseInt(process.env.SESSION_TIME, 20) * 60 * 1000;
    this.closeSession(clienteId);

    const timeoutId = setTimeout(() => {
      this.closeSession(clienteId);
    }, timeOfSession);

    this.activesSessions.set(clienteId, timeoutId);
    this.logger.debug(`Open session for the client: ${clienteId}`);
  }

  private closeSession(clienteId: string): void {
    const timeoutId = this.activesSessions.get(clienteId);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.activesSessions.delete(clienteId);
      this.logger.debug(`Session closed for the client: ${clienteId}`);
    }
  }
}
