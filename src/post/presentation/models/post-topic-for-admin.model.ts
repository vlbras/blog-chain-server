import { ApiProperty } from '@nestjs/swagger';

import { PostForAdmin } from './post-for-admin.mode';

import { Post, Topic } from '#post/domain/models';
import { User } from '#user/domain/models';

class TopicProps {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;
}

export class PostTopicForAdmin extends PostForAdmin {
  @ApiProperty()
  public topic: TopicProps;
}

export function toPostTopicForAdminModel(model: Post, topic: Topic, creator: User, updater?: User): PostTopicForAdmin {
  return {
    id: model.id,
    title: model.title,
    content: model.content,
    topic: {
      id: topic.id,
      name: topic.name,
    },
    createdBy: {
      id: creator.id,
      email: creator.email,
    },
    ...(updater && {
      updatedBy: {
        id: updater.id,
        email: updater.email,
      },
    }),
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
}
