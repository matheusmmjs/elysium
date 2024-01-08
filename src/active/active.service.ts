import { Logger, Injectable, BadRequestException } from '@nestjs/common';
import { Twilio } from 'twilio';
import { CreateActiveDto } from './dto/create-active.dto';
import { HistoricService } from './../historic/historic.service';
import { MessageStatusEnum } from './../historic/enum/message-status.enum';
import { MessageRoleEnum } from './../historic/enum/message-role.enum';

@Injectable()
export class ActiveService {
  private readonly logger = new Logger(ActiveService.name);
  private readonly twilioClient: Twilio;

  constructor(private readonly historicService: HistoricService) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async create(createActiveDto: CreateActiveDto): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        body: createActiveDto.body,
        to: `whatsapp:+${createActiveDto.to}`,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      this.logger.debug('Sent successfully');

      this.historicService.create(createActiveDto.to, {
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `whatsapp:${createActiveDto.to}`,
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
