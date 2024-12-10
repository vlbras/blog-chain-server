import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { PostForAdmin, PostModel, PostTopicForAdmin, TopicModel, toPostModel } from '../models';

import { AuthRoles, UserRoles } from '#common';
import { PostQueryService } from '#post/application/services';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller()
export class PostQueryController {
  public constructor(private readonly postService: PostQueryService) {}

  @Get('topic/:id/post')
  public async findMany(@Param('id') topicId: string): Promise<PostModel[]> {
    const posts = await this.postService.findMany(topicId);
    return posts.map(toPostModel);
  }

  @Get('topic')
  public async findManyTopics(): Promise<TopicModel[]> {
    return this.postService.findManyTopics();
  }

  @AuthRoles(UserRoles.ADMIN)
  @Get('admin/post/:id')
  public async findOneForAdmin(@Param('id') id: string): Promise<PostTopicForAdmin> {
    return this.postService.findOneForAdmin(id);
  }

  @AuthRoles(UserRoles.ADMIN)
  @Get('admin/topic/:id/post')
  public async findManyForAdmin(@Param('id') topicId: string): Promise<PostForAdmin[]> {
    return this.postService.findManyForAdmin(topicId);
  }
}
