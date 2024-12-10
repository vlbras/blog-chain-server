import { Injectable } from '@nestjs/common';

import { Post } from '#post/domain/models';
import { PostCommandRepository, TopicRepository } from '#post/infrastructure/repositories';
import { CreatePostDto, UpdatePostDto } from '#post/presentation/dto';

@Injectable()
export class PostCommandService {
  public constructor(
    private readonly postRepository: PostCommandRepository,
    private readonly topicRepository: TopicRepository,
  ) {}

  public async create(createPostDto: CreatePostDto, createdBy: string): Promise<Post> {
    const topicId = await this.topicRepository.upsert(createPostDto.topicName);

    return this.postRepository.create({
      ...createPostDto,
      topicId,
      createdBy,
    });
  }

  public async updateOne(id: string, updatePostDto: UpdatePostDto, updatedBy: string): Promise<Post> {
    const topicId = await this.topicRepository.upsert(updatePostDto.topicName);

    return this.postRepository.updateOne(
      { id },
      {
        ...updatePostDto,
        topicId,
        updatedBy,
      },
    );
  }

  public async deleteOne(id: string): Promise<void> {
    await this.postRepository.deleteOne({ id });
  }

  // TODO: autoDeleteTopic
}
