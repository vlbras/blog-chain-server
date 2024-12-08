import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthRoles, CurrentUserId, UserRoles } from '#common';
import { CreatePostDto, UpdatePostDto } from '#post/dto';
import { PostForAdmin } from '#post/models';
import { PostAdminService } from '#post/services/post-admin.service';

@ApiTags('Posts - Admins')
@AuthRoles(UserRoles.ADMIN)
@Controller('admin')
export class PostAdminsController {
  public constructor(private readonly postService: PostAdminService) {}

  @Get('topic/:id/post')
  public findMany(@Param('id') topicId: string): Promise<PostForAdmin[]> {
    return this.postService.findMany(topicId);
  }

  @Get('post/:id')
  public async findOne(@Param('id') id: string): Promise<PostForAdmin> {
    const post = await this.postService.findOne(id);
    console.log(post);
    return post;
  }

  @Post('post')
  public async create(@Body() createPostDto: CreatePostDto, @CurrentUserId() userId: string): Promise<PostForAdmin> {
    return this.postService.create(createPostDto, userId);
  }

  @Put('post/:id')
  public updateOne(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUserId() userId: string,
  ): Promise<PostForAdmin> {
    return this.postService.updateOne(id, updatePostDto, userId);
  }

  @Delete('post/:id')
  public deleteOne(@Param('id') id: string): Promise<void> {
    return this.postService.deleteOne(id);
  }
}
