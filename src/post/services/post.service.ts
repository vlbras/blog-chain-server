import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PostEntity } from '#post/entities';
import { Post } from '#post/models';
import { TopicService } from '#topic/topic.service';

@Injectable()
export class PostService {
  public constructor(
    @InjectModel(PostEntity.name)
    private readonly postEntity: Model<PostEntity>,
    private readonly topicService: TopicService,
  ) {}

  public async findMany(topicId: string): Promise<Post[]> {
    await this.topicService.findOne(topicId);

    const posts = await this.postEntity.find({ topicId });
    return posts.map(this.mapEntityToModel);
  }

  private mapEntityToModel(entity: PostEntity): Post {
    return {
      id: entity._id.toString(),
      title: entity.title,
      content: entity.content,
      topicId: entity.topicId,
    };
  }
}
