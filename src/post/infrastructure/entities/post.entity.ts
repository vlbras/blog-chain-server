import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { TopicEntity } from './topic.entity';

import { AbstractEntity } from '#common';

@Schema({
  collection: 'posts',
  timestamps: true,
})
export class PostEntity extends AbstractEntity {
  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public content: string;

  @Prop({
    type: Types.ObjectId,
    index: true,
    ref: TopicEntity.name,
  })
  public topicId: string;

  @Prop({
    required: true,
  })
  public createdBy: string;

  @Prop()
  public updatedBy?: string;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
