import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FindPostInput, FindPostsInput, UpdatePostInput, PostQueryBuilder } from './builders/post-query.builder';
import { PostEntity } from '../entities/post.entity';
import { PostMapper } from '../mappers/post.mapper';

import { Post } from '#post/domain/models';

@Injectable()
export class PostCommandRepository {
  public constructor(
    @InjectModel(PostEntity.name)
    private readonly postEntity: Model<PostEntity>,
  ) {}

  public async create(input: CreatePostInput): Promise<Post> {
    try {
      const post = await this.postEntity.create(input);
      return PostMapper.mapEntityToModel(post);
    } catch (err) {
      if (err.code === 11000) {
        const message = `Post already exists`;
        throw new ConflictException(message);
      }
      throw err;
    }
  }

  public async createMany(input: CreatePostInput[]): Promise<number> {
    return (await this.postEntity.insertMany(input)).length;
  }

  public async updateOne(input: FindPostInput, data: UpdatePostInput): Promise<Post> {
    const filter = PostQueryBuilder.findPostQuery(input);
    const updateData = PostQueryBuilder.updatePostQuery(data);
    const post = await this.postEntity.findOneAndUpdate(filter, updateData, { lean: true, new: true }).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return PostMapper.mapEntityToModel(post);
  }

  public async updateMany(input: FindPostsInput, data: UpdatePostInput): Promise<number> {
    const filter = PostQueryBuilder.findPostsQuery(input);
    const updateData = PostQueryBuilder.updatePostQuery(data);

    return (await this.postEntity.updateMany(filter, updateData)).modifiedCount;
  }

  public async deleteOne(input: FindPostInput): Promise<void> {
    const filter = PostQueryBuilder.findPostQuery(input);
    const post = await this.postEntity.findOneAndDelete(filter).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  public async deleteMany(input: FindPostsInput): Promise<number> {
    const filter = PostQueryBuilder.findPostsQuery(input);
    return (await this.postEntity.deleteMany(filter)).deletedCount;
  }
}

type CreatePostInput = {
  title: string;
  content: string;
  topicId: string;
  createdBy: string;
};
