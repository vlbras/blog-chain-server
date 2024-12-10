import { PostEntity } from '../entities/post.entity';

import { Post } from '#post/domain/models';

export class PostMapper {
  public static mapEntityToModel(entity: PostEntity): Post {
    return {
      id: entity._id.toString(),
      title: entity.title,
      content: entity.content,
      topicId: entity.topicId,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
