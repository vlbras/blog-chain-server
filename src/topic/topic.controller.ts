import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Topic } from './models/topic.model';
import { TopicService } from './topic.service';

@ApiTags('Topics')
@Controller('topic')
export class TopicController {
  public constructor(private readonly topicService: TopicService) {}

  @Get()
  public findMany(): Promise<Topic[]> {
    return this.topicService.findMany();
  }
}
