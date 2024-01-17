import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHistoricDto } from './dto/create-historic.dto';
import { Model, Types } from 'mongoose';
import { Message } from './schema/message.schema';
import { Historic } from './schema/historic.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CentralService } from './../central/central.service';

@Injectable()
export class HistoricService {
  private readonly logger = new Logger(HistoricService.name);

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('Historic') private readonly historicModel: Model<Historic>,
    private readonly centralService: CentralService,
  ) {}

  async create(
    central: Types.ObjectId,
    clientId: string,
    createHistoricDto: CreateHistoricDto,
  ): Promise<void> {
    try {
      const newMessage = new this.messageModel({
        ...createHistoricDto,
        central,
      });

      await newMessage.save();
      this.logger.debug('Saved new message successfully');

      const historic = await this.historicModel
        .findOne({ clientId, central })
        .exec();

      if (historic) {
        historic.messages.push(
          new this.messageModel({
            ...createHistoricDto,
            central,
          }),
        );
        this.logger.debug('Updated historic successfully');

        await historic.save();
      } else {
        const newHistoric = new this.historicModel({
          clientId,
          messages: [
            new this.messageModel({
              ...createHistoricDto,
              central,
            }),
          ],
          central,
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

  async findOne(centralId: string, clientId: string): Promise<Historic | null> {
    try {
      const central = await this.centralService.findOne(centralId);

      return await this.historicModel
        .findOne({ clientId, central: central._id })
        .exec();
    } catch (error) {
      this.logger.error('Error fetching historic:', error);
      throw new UnprocessableEntityException({
        message: 'Error fetching historic',
        error,
      });
    }
  }
}
