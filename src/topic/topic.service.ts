import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopicEntity } from './entities/topic.entity';
import { Topic } from './models/topic.model';

@Injectable()
export class TopicService {
  public constructor(
    @InjectModel(TopicEntity.name)
    private readonly topicEntity: Model<TopicEntity>,
  ) {}

  public async findOne(id: string): Promise<Topic> {
    const topic = await this.topicEntity.findById(id);

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    return this.mapEntityToModel(topic);
  }

  public async findMany(): Promise<Topic[]> {
    const topics = await this.topicEntity.aggregate([
      {
        $addFields: {
          topicIdAsString: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'topicIdAsString',
          foreignField: 'topicId',
          as: 'posts',
        },
      },
      {
        $project: {
          id: '$_id',
          name: 1,
          posts: {
            $map: {
              input: { $sortArray: { input: '$posts', sortBy: { createdAt: 1 } } },
              as: 'post',
              in: { _id: '$$post._id', title: '$$post.title' },
            },
          },
        },
      },
      { $sort: { createdAt: 1 } },
    ]);

    return topics.map(this.mapEntityToModel);
  }

  public async upsert(name: string): Promise<string> {
    const topic = await this.topicEntity.findOneAndUpdate({ name }, {}, { new: true, upsert: true }).exec();
    return topic._id.toString();
  }

  // TODO: updateOne and deleteOne for admin

  private mapEntityToModel(entity: TopicEntity): Topic {
    return {
      id: entity._id.toString(),
      name: entity.name,
      posts:
        entity.posts?.map(post => ({
          id: post._id.toString(),
          title: post.title,
        })) || [],
    };
  }
}
