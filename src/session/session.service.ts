import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schema/session.schema';
// import configCommon from './../common/config.common';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async create(
    clientId: string,
    userId: string,
    attendingId: string,
    isBotSession?: boolean,
  ): Promise<void> {
    try {
      const session = new this.sessionModel({
        clientId,
        userId,
        isBotSession,
        attending: attendingId,
      });
      await session.save();
      this.logger.debug('Started new session successfully');
    } catch (error) {
      this.logger.error('Error saving session to schema:', error);
      throw new UnprocessableEntityException({
        message: 'Error saving session to schema',
        error,
      });
    }
  }

  async findOne(clientId: string): Promise<Session | null> {
    return this.sessionModel
      .findOne({
        clientId,
        isActive: true,
      })
      .exec();
  }

  // async end(sessionId: string): Promise<void> {
  //   await this.sessionModel.findByIdAndUpdate(sessionId, { isActive: false });
  // }
}
