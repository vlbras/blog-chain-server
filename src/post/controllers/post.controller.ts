import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Post } from '#post/models';
import { PostService } from '#post/services/post.service';

@ApiTags('Posts')
@Controller()
export class PostController {
  public constructor(private readonly postService: PostService) {}

  @Get('topic/:id/post')
  public findMany(@Param('id') topicId: string): Promise<Post[]> {
    return this.postService.findMany(topicId);
  }
}
