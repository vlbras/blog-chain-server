import { Injectable } from '@nestjs/common';

import { Topic } from '#post/domain/models';
import { TopicRepository } from '#post/infrastructure/repositories';
import { UpdateTopicDto } from '#post/presentation/dto';

@Injectable()
export class TopicCommandService {
  public constructor(private readonly topicRepository: TopicRepository) {}

  public updateOne(id: string, data: UpdateTopicDto): Promise<Topic> {
    return this.topicRepository.updateOne(id, data);
  }

  public deleteOne(id: string): Promise<void> {
    return this.topicRepository.deleteOne(id);
  }
}
