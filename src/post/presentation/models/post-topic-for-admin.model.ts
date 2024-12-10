import { PostForAdmin } from './post-for-admin.mode';

import { Post, Topic } from '#post/domain/models';
import { User } from '#user/domain/models';

export class PostTopicForAdmin extends PostForAdmin {
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

class TopicProps {
  public id: string;
  public name: string;
}
