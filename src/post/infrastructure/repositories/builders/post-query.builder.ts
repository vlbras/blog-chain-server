import { BadRequestException } from '@nestjs/common';
import { FilterQuery, Types, UpdateQuery } from 'mongoose';

import { AtLeastOne } from '#common';
import { PostEntity } from '#post/infrastructure/entities';

export class PostQueryBuilder {
  public static findPostQuery(input: FindPostInput): FilterQuery<PostEntity> {
    const filter: FilterQuery<PostEntity> = {};

    input.id && (filter._id = new Types.ObjectId(input.id));
    input.email && (filter.email = input.email);

    return filter;
  }

  public static findPostsQuery(input: FindPostsInput): FilterQuery<PostEntity> {
    const filter: FilterQuery<PostEntity> = {};

    input.ids && (filter._id = { $in: input.ids });
    input.topicId && (filter.topicId = input.topicId);

    // TODO: add pagination

    return filter;
  }

  public static updatePostQuery(input: UpdatePostInput): UpdateQuery<PostEntity> {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException('No data provided');
    }

    return input;
  }
}

export type FindPostInput = AtLeastOne<{
  id?: string;
  email?: string;
}>;

export type FindPostsInput = {
  ids?: string[];
  topicId?: string;
};

export type UpdatePostInput = {
  title?: string;
  content?: string;
  topicId?: string;
  updatedBy?: string;
};
