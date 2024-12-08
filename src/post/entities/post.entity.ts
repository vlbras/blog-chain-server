import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractEntity } from '#common';
import { User } from '#user/domain/models';

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
    required: true,
  })
  public topicId: string;

  @Prop({
    required: true,
  })
  public createdBy: string;

  public user?: User;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
