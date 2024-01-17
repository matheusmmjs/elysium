import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attending } from './schema/attending.schema';
// import configCommon from './../common/config.common';

@Injectable()
export class AttendingService {
  private readonly logger = new Logger(AttendingService.name);

  constructor(
    @InjectModel('Attending') private readonly attendingModel: Model<Attending>,
  ) {}

  async create(clientId: string, context?: string): Promise<void> {
    try {
      const newAttending = new this.attendingModel({
        clientId,
        context,
      });
      await newAttending.save();
      this.logger.debug('Started new attending successfully');
    } catch (error) {
      this.logger.error('Error saving attending to schema:', error);
      throw new UnprocessableEntityException({
        message: 'Error saving attending to schema',
        error,
      });
    }
  }

  async findOne(clientId: string): Promise<Attending | null> {
    try {
      return await this.attendingModel
        .findOne({
          clientId,
          isActive: true,
        })
        .exec();
    } catch (error) {
      this.logger.error('Error fetching attending:', error);
      throw new UnprocessableEntityException({
        message: 'Error fetching attending',
        error,
      });
    }
  }

  // async end(sessionId: string): Promise<void> {
  //   await this.sessionModel.findByIdAndUpdate(sessionId, { isActive: false });
  // }
}
