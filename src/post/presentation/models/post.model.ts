import { Post } from '#post/domain/models';

export class PostModel {
  public id: string;
  public title: string;
  public content: string;
}

export function toPostModel(model: Post): PostModel {
  return {
    id: model.id,
    title: model.title,
    content: model.content,
  };
}
