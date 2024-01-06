import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { History } from './schema/history.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    @InjectModel('History') private readonly historyModel: Model<History>,
  ) {}

  async create(clientId: string, createHistoryDto: CreateHistoryDto) {
    try {
      const newMessage = new this.messageModel(createHistoryDto);
      await newMessage.save();
      const history = await this.historyModel.findOne({ clientId }).exec();
      if (history) {
        history.messages.push(new this.messageModel(createHistoryDto));
        this.logger.debug('Updated history successfully');
        return await history.save();
      } else {
        const newHistory = new this.historyModel({
          clientId,
          messages: [new this.messageModel(createHistoryDto)],
        });
        this.logger.debug('Saved new history successfully');
        return await newHistory.save();
      }
    } catch (error) {
      this.logger.error('Error saving message to schema:', error);
      throw new UnprocessableEntityException({
        message: 'Error saving message to schema',
        error,
      });
    }
  }

  async get(clientId: string): Promise<History | null> {
    try {
      return await this.historyModel.findOne({ clientId }).exec();
    } catch (error) {
      this.logger.error('Error fetching history:', error);
      throw new UnprocessableEntityException({
        message: 'Error fetching history',
        error,
      });
    }
  }
}
