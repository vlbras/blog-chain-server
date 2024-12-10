import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from '#common';

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
}

export const TopicSchema = SchemaFactory.createForClass(TopicEntity);
