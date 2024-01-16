import { Injectable, Logger } from '@nestjs/common';
import { CreateReceptiveDto } from './dto/create-receptive.dto';
import { HistoricService } from './../historic/historic.service';
import { MessageRoleEnum } from './../historic/enum/message-role.enum';
import { MessageStatusEnum } from './../historic/enum/message-status.enum';
import { AttendingService } from './../attending/attending.service';

@Injectable()
export class ReceptiveService {
  private readonly logger = new Logger(ReceptiveService.name);

  constructor(
    private readonly historicService: HistoricService,
    private readonly attendingService: AttendingService,
  ) {}

  async create(createReceptiveDto: CreateReceptiveDto): Promise<void> {
    try {
      const attendingExists = await this.attendingService.findOne(
        createReceptiveDto.WaId,
      );

      if (!attendingExists) {
        this.logger.debug('Attending not exists');
        await this.attendingService.create(createReceptiveDto.WaId);
      } else {
        this.logger.debug('Attending exists');
      }

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
}
