import { Injectable } from '@nestjs/common';

import { Post } from '#post/domain/models';
import { PostQueryRepository, TopicRepository } from '#post/infrastructure/repositories';
import { PostForAdmin, PostTopicForAdmin, TopicModel, toPostTopicForAdminModel } from '#post/presentation/models';
import { UserIntegrationService } from '#user/integration/user-integration.service';

@Injectable()
export class PostQueryService {
  public constructor(
    private readonly postRepository: PostQueryRepository,
    private readonly topicRepository: TopicRepository,
    private readonly userService: UserIntegrationService,
  ) {}

  public async findMany(topicId: string): Promise<Post[]> {
    return this.postRepository.findMany({ topicId });
  }

  public async findOne(id: string): Promise<Post> {
    return this.postRepository.findOneOrThrow({ id });
  }

  public async findManyTopics(): Promise<TopicModel[]> {
    const [posts, topics] = await Promise.all([this.postRepository.findMany({}), this.topicRepository.findMany()]);

    const topicMap = new Map();

    posts.forEach(post => {
      if (!topicMap.has(post.topicId)) {
        topicMap.set(post.topicId, []);
      }
      topicMap.get(post.topicId).push({ id: post.id, title: post.title });
    });

    return topics.map(topic => ({
      id: topic.id,
      name: topic.name,
      posts: topicMap.get(topic.id) || [],
    }));
  }

  public async findOneForAdmin(id: string): Promise<PostTopicForAdmin> {
    const post = await this.postRepository.findOneOrThrow({ id });
    const topic = await this.topicRepository.findOne(post.topicId);

    const userIds = [post.createdBy];
    if (post.updatedBy) userIds.push(post.updatedBy);

    const users = await this.userService.findMany({ ids: userIds });

    return toPostTopicForAdminModel(post, topic, users[0], users[1]);
  }

  public async findManyForAdmin(topicId: string): Promise<PostForAdmin[]> {
    const posts = await this.postRepository.findMany({ topicId });

    const userIds = new Set<string>();

    posts.forEach(p => {
      userIds.add(p.createdBy);
      p.updatedBy && userIds.add(p.updatedBy);
    });

    const users = await this.userService.findMany({ ids: Array.from(userIds) });
    const userMap = new Map(users.map(user => [user.id, { id: user.id, email: user.email }]));

    return posts.map(post => ({
      ...post,
      createdBy: userMap.get(post.createdBy)!,
      updatedBy: post.updatedBy ? userMap.get(post.updatedBy) : undefined,
    }));
  }
}
