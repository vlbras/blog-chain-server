import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindPostInput, FindPostsInput, PostQueryBuilder } from './builders/post-query.builder';
import { PostEntity } from '../entities/post.entity';
import { PostMapper } from '../mappers/post.mapper';

import { Post } from '#post/domain/models';

@Injectable()
export class PostQueryRepository {
  public constructor(
    @InjectModel(PostEntity.name)
    private readonly postEntity: Model<PostEntity>,
  ) {}

  public async findOne(input: FindPostInput): Promise<Post | null> {
    const filter = PostQueryBuilder.findPostQuery(input);
    const post = await this.postEntity.findOne(filter).lean().exec();

    return post ? PostMapper.mapEntityToModel(post) : null;
  }

  public async findOneOrThrow(input: FindPostInput): Promise<Post> {
    const post = await this.findOne(input);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async findMany(input: FindPostsInput): Promise<Post[]> {
    const filter = PostQueryBuilder.findPostsQuery(input);
    const posts = await this.postEntity.find(filter).sort({ createdAt: 1 }).lean().exec();

    return posts.map(PostMapper.mapEntityToModel);
  }

  public count(input: FindPostsInput): Promise<number> {
    return this.postEntity.countDocuments(input);
  }
}
