import * as dotenv from 'dotenv';
dotenv.config();
import { Logger, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { CreateActiveDto } from './dto/create-active.dto';

@Injectable()
export class ActiveService {
  private readonly logger = new Logger(ActiveService.name);
  private readonly twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async create(createActiveDto: CreateActiveDto) {
    try {
      const message = await this.twilioClient.messages.create({
        body: createActiveDto.body,
        to: createActiveDto.to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      this.logger.debug('Message:', message);

      return message.sid;
    } catch (error) {
      this.logger.error('Erro ao enviar mensagem Twilio:', error);
      throw error;
    }
  }
}
