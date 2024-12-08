import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostDto, UpdatePostDto } from '#post/dto';
import { PostEntity } from '#post/entities';
import { PostForAdmin } from '#post/models';
import { TopicService } from '#topic/topic.service';

@Injectable()
export class PostAdminService {
  public constructor(
    @InjectModel(PostEntity.name)
    private readonly postEntity: Model<PostEntity>,
    private readonly topicService: TopicService,
  ) {
    // setTimeout(async () => {
    //   try {
    //     const data = await readFile('src/post/services/exported-posts.json', 'utf8');
    //     const rawPosts = JSON.parse(data);
    //     const posts: CreatePostDto[] = rawPosts.map((post: any) => ({
    //       title: post.title,
    //       content: post.content,
    //       topicName: post.topic,
    //     }));
    //     const sleep = async (ms: number): Promise<void> => await new Promise(resolve => setTimeout(resolve, ms));
    //     for (const post of posts) {
    //       await this.create(post, '67546869e13d84abcaeafcb2');
    //       await sleep(10);
    //     }
    //     console.log('Done');
    //   } catch (err) {
    //     console.error('Error reading file:', err);
    //   }
    // }, 500);
  }

  public async findMany(topicId: string): Promise<PostForAdmin[]> {
    await this.topicService.findOne(topicId);

    const posts = await this.postEntity.find({ topicId });
    return posts.map(this.mapEntityToModel);
  }

  public async findOne(postId: string): Promise<PostForAdmin> {
    const post = await this.postEntity.findById(postId);

    if (!post) {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      throw new NotFoundException('Post not found');
    }

    return this.mapEntityToModel(post);
  }

  public async create(createPostDto: CreatePostDto, createdBy: string): Promise<PostForAdmin> {
    const topicId = await this.topicService.upsert(createPostDto.topicName);

    const post = await this.postEntity.create({
      ...createPostDto,
      topicId,
      createdBy,
    });

    return this.mapEntityToModel(post);
  }

  public async updateOne(id: string, updatePostDto: UpdatePostDto, updatedBy: string): Promise<PostForAdmin> {
    const topicId = await this.topicService.upsert(updatePostDto.topicName);

    const post = await this.postEntity.findByIdAndUpdate(id, {
      ...updatePostDto,
      topicId,
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.mapEntityToModel(post);
  }

  public async deleteOne(id: string): Promise<void> {
    const post = this.postEntity.findByIdAndDelete(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }
  }

  // TODO: autoDeleteTopic for admin

  private mapEntityToModel(entity: PostEntity): PostForAdmin {
    return {
      id: entity._id.toString(),
      title: entity.title,
      content: entity.content,
      topicId: entity.topicId,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
