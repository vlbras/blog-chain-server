import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from '#common';
import { PostEntity } from '#post/entities';

@Schema({
  collection: 'topics',
  timestamps: true,
})
export class TopicEntity extends AbstractEntity {
  @Prop({
    required: true,
    unique: true,
  })
  public name: string;

  public posts?: PostEntity[];
}

export const TopicSchema = SchemaFactory.createForClass(TopicEntity);
