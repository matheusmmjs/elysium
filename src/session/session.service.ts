import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schema/session.schema';
import { Types } from 'mongoose';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async create(
    clientId: string,
    centralId: Types.ObjectId,
    userId: string,
    attendingId: string,
    isBotSession?: boolean,
  ): Promise<void> {
    try {
      const newSession = new this.sessionModel({
        clientId,
        central: centralId,
        userId,
        isBotSession,
        attending: attendingId,
      });
      await newSession.save();
      this.logger.debug('Started new session successfully');
    } catch (error) {
      this.logger.error('Error saving session to schema:', error);
      throw new UnprocessableEntityException({
        message: 'Error saving session to schema',
        error,
      });
    }
  }

  async findOne(
    clientId: string,
    centralId: Types.ObjectId,
  ): Promise<Session | null> {
    return await this.sessionModel
      .findOne({
        clientId,
        central: centralId,
        isActive: true,
      })
      .exec();
  }

  // async end(sessionId: string): Promise<void> {
  //   await this.sessionModel.findByIdAndUpdate(sessionId, { isActive: false });
  // }
}
