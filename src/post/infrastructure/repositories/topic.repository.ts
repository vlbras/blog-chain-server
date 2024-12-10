import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
      // eslint-disable-next-line sonarjs/no-duplicate-string
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

  public async updateOne(id: string, data: { name: string }): Promise<Topic> {
    try {
      const topic = await this.topicEntity.findByIdAndUpdate(id, data, { lean: true, new: true }).exec();

      if (!topic) {
        throw new NotFoundException('Topic not found');
      }

      return this.mapEntityToModel(topic);
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Topi name already taken');
      }

      throw err;
    }
  }

  public async deleteOne(id: string): Promise<void> {
    const topic = await this.topicEntity.findByIdAndDelete(id);

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
  }

  private mapEntityToModel(entity: TopicEntity): Topic {
    return {
      id: entity._id.toString(),
      name: entity.name,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
