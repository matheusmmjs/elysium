import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { Historic } from './schema/historic.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HistoricService {
  private readonly logger = new Logger(HistoricService.name);

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('Historic') private readonly historicModel: Model<Historic>,
  ) {}

  async create(
    clientId: string,
    createHistoricDto: CreateHistoricDto,
  ): Promise<void> {
    try {
      const newMessage = new this.messageModel(createHistoricDto);
      await newMessage.save();

      const historic = await this.historicModel.findOne({ clientId }).exec();
      if (historic) {
        historic.messages.push(new this.messageModel(createHistoricDto));
        this.logger.debug('Updated historic successfully');

        await historic.save();
      } else {
        const phoneNumberRegex: RegExp = /whatsapp:\+(\d+)/;
        const match: RegExpMatchArray | null =
          createHistoricDto.from.match(phoneNumberRegex);

        const newHistoric = new this.historicModel({
          clientId,
          messages: [new this.messageModel(createHistoricDto)],
          tenant: match[1],
        });
        this.logger.debug('Saved new historic successfully');

        await newHistoric.save();
      }
    } catch (error) {
      this.logger.error('Error saving message or historic to schema:', error);
      throw new UnprocessableEntityException({
        message: 'Error saving message or historic to schema',
        error,
      });
    }
  }

  async findOne(clientId: string): Promise<Historic | null> {
    try {
      return await this.historicModel.findOne({ clientId }).exec();
    } catch (error) {
      this.logger.error('Error fetching historic:', error);
      throw new UnprocessableEntityException({
        message: 'Error fetching historic',
        error,
      });
    }
  }
}
