import { Injectable } from '@nestjs/common';

import { Post } from '#post/domain/models';
import { PostCommandRepository, PostQueryRepository, TopicRepository } from '#post/infrastructure/repositories';
import { CreatePostDto, UpdatePostDto } from '#post/presentation/dto';

@Injectable()
export class PostCommandService {
  public constructor(
    private readonly postRepository: PostCommandRepository,
    private readonly postQueryRepository: PostQueryRepository,
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

  public async updateOne(id: string, updatePostDto: UpdatePostDto, updatedBy: string): Promise<void> {
    const topicId = await this.topicRepository.upsert(updatePostDto.topicName);

    const post = await this.postRepository.updateOne(
      { id },
      {
        ...updatePostDto,
        topicId,
        updatedBy,
      },
      { new: false },
    );

    await this.autoDeleteTopic(post.topicId);
  }

  public async deleteOne(id: string): Promise<void> {
    const post = await this.postRepository.deleteOne({ id });
    await this.autoDeleteTopic(post.topicId);
  }

  private async autoDeleteTopic(topicId: string): Promise<void> {
    const postsCount = await this.postQueryRepository.count({ topicId });

    if (postsCount === 0) {
      await this.topicRepository.deleteOne(topicId);
    }
  }
}
