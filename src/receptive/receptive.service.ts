import { Injectable, Logger } from '@nestjs/common';
import { CreateReceptiveDto } from './dto/create-receptive.dto';
import { HistoricService } from './../historic/historic.service';
import { MessageRoleEnum } from './../historic/enum/message-role.enum';
import { MessageStatusEnum } from './../historic/enum/message-status.enum';

@Injectable()
export class ReceptiveService {
  private readonly logger = new Logger(ReceptiveService.name);
  private activesSessions: Map<string, NodeJS.Timeout> = new Map();

  constructor(private readonly historicService: HistoricService) {}

  create(createReceptiveDto: CreateReceptiveDto) {
    try {
      // this.openSession(createReceptiveDto.WaId);

      this.historicService.create(createReceptiveDto.WaId, {
        from: createReceptiveDto.From,
        to: createReceptiveDto.To,
        content: createReceptiveDto.Body,
        status: MessageStatusEnum[createReceptiveDto.SmsStatus.toUpperCase()],
        name: createReceptiveDto.ProfileName,
        role: MessageRoleEnum.CLIENT,
      });
    } catch (error) {
      throw error;
    }
  }

  //TODO Melhorar feature de sessão, torna-lo um modulo
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
