import { Logger, Injectable, BadRequestException } from '@nestjs/common';
import { Twilio } from 'twilio';
import { CreateActiveDto } from './dto/create-active.dto';
import { HistoricService } from './../historic/historic.service';
import { MessageStatusEnum } from './../historic/enum/message-status.enum';
import { MessageRoleEnum } from './../historic/enum/message-role.enum';
import configCommon from './../common/config.common';
import { CentralService } from './../central/central.service';

@Injectable()
export class ActiveService {
  private readonly logger = new Logger(ActiveService.name);
  private readonly twilioClient: Twilio;

  constructor(
    private readonly historicService: HistoricService,
    private readonly centralService: CentralService,
  ) {
    this.twilioClient = new Twilio(
      configCommon.twilioAccountSid,
      configCommon.twilioAuthToken,
    );
  }

  async create(createActiveDto: CreateActiveDto): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        body: createActiveDto.body,
        to: `whatsapp:+${createActiveDto.to}`,
        from: `whatsapp:+${configCommon.twilioPhoneNumber}`,
      });
      this.logger.debug('Sent successfully');

      const central = await this.centralService.findOne(
        createActiveDto.centralId,
      );

      await this.historicService.create(central._id, createActiveDto.to, {
        from: configCommon.twilioPhoneNumber,
        to: createActiveDto.to,
        content: createActiveDto.body,
        status: MessageStatusEnum.SENT,
        name: createActiveDto.name,
        role: MessageRoleEnum.OPERATOR,
      });
    } catch (error) {
      this.logger.error(
        'Error sending Twilio message or inserting historic:',
        error,
      );
      throw new BadRequestException({
        message: 'Error sending Twilio message or inserting historic',
        error,
      });
    }
  }
}
