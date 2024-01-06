import { Controller, Post, Body } from '@nestjs/common';
import { ReceptiveService } from './receptive.service';
import { CreateReceptiveDto } from './dto/create-receptive.dto';

@Controller({
  version: '1',
  path: 'receptives/messages',
})
export class ReceptiveController {
  constructor(private readonly receptiveService: ReceptiveService) {}

  @Post()
  create(@Body() createReceptiveDto: CreateReceptiveDto) {
    return this.receptiveService.create(createReceptiveDto);
  }
}
