import { Controller, Post, Body } from '@nestjs/common';
import { ActiveService } from './active.service';
import { CreateActiveDto } from './dto/create-active.dto';

@Controller({
  version: '1',
  path: 'actives/messages',
})
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @Post()
  create(@Body() createActiveDto: CreateActiveDto) {
    return this.activeService.create(createActiveDto);
  }
}
