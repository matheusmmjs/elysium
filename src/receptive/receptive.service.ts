import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateReceptiveDto } from './dto/create-receptive.dto';
import { HistoricService } from './../historic/historic.service';
import { MessageRoleEnum } from './../historic/enum/message-role.enum';
import { MessageStatusEnum } from './../historic/enum/message-status.enum';
import { AttendingService } from './../attending/attending.service';
import { SessionService } from './../session/session.service';
import configCommon from './../common/config.common';
import { TenantCentralService } from './../central/tenant-central.service';
import { Types } from 'mongoose';

@Injectable()
export class ReceptiveService {
  private readonly logger = new Logger(ReceptiveService.name);

  constructor(
    private readonly historicService: HistoricService,
    private readonly attendingService: AttendingService,
    private readonly sessionService: SessionService,
    private readonly tenantCentralService: TenantCentralService,
  ) {}

  async create(createReceptiveDto: CreateReceptiveDto): Promise<void> {
    try {
      const phoneNumberRegex: RegExp = /whatsapp:\+(\d+)/;
      const to: string = createReceptiveDto.To.match(phoneNumberRegex)[1];
      const from: string = createReceptiveDto.From.match(phoneNumberRegex)[1];

      const central: Types.ObjectId = await this.processIncomingMessage(to);

      const attendingExists = await this.attendingService.findOne(
        createReceptiveDto.WaId,
        central,
      );

      if (!attendingExists) {
        this.logger.debug('Attending not exists');
        await this.attendingService.create(createReceptiveDto.WaId, central);

        const { _id } = await this.attendingService.findOne(
          createReceptiveDto.WaId,
          central,
        );

        await this.sessionService.create(
          createReceptiveDto.WaId,
          central,
          configCommon.userIdBot,
          _id,
        );
      } else {
        this.logger.debug('Attending exists');
      }

      await this.historicService.create(central, createReceptiveDto.WaId, {
        from,
        to,
        content: createReceptiveDto.Body,
        status: MessageStatusEnum[createReceptiveDto.SmsStatus.toUpperCase()],
        name: createReceptiveDto.ProfileName,
        role: MessageRoleEnum.CLIENT,
      });
    } catch (error) {
      throw error;
    }
  }

  private async processIncomingMessage(
    tenant: string,
  ): Promise<Types.ObjectId> {
    const central: Types.ObjectId =
      await this.tenantCentralService.findCentralByTenant(tenant);

    if (!central) {
      throw new NotFoundException('Central not found');
    }

    return central;
  }
}
