import { Injectable, Logger } from '@nestjs/common';
import { CreateReceptiveDto } from './dto/create-receptive.dto';

@Injectable()
export class ReceptiveService {
  private readonly logger = new Logger(ReceptiveService.name);

  create(createReceptiveDto: CreateReceptiveDto) {
    this.logger.debug('Message:', createReceptiveDto);
  }
}
