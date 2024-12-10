import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TopicEntity } from '../entities';

import { Topic } from '#post/domain/models';

@Injectable()
export class TopicRepository {
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
    const topics = await this.topicEntity.find().sort({ createdAt: 1 }).lean().exec();
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
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
