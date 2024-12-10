import { ApiProperty } from '@nestjs/swagger';

import { Post } from '#post/domain/models';

export class PostModel {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;
}

export function toPostModel(model: Post): PostModel {
  return {
    id: model.id,
    title: model.title,
    content: model.content,
  };
}
