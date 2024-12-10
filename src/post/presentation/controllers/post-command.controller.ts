import { Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ActionResponse, AuthRoles, CurrentUserId, UserRoles } from '#common';
import { PostCommandService } from '#post/application/services';
import { CreatePostDto, UpdatePostDto } from '#post/presentation/dto';

@ApiTags('post - command')
@ApiBearerAuth()
@Controller('admin/post')
@AuthRoles(UserRoles.ADMIN)
export class PostCommandController {
  public constructor(private readonly postCommandService: PostCommandService) {}

  @Post()
  public async create(@Body() createPostDto: CreatePostDto, @CurrentUserId() userId: string): Promise<ActionResponse> {
    const post = await this.postCommandService.create(createPostDto, userId);
    return { id: post.id };
  }

  @Put(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUserId() userId: string,
  ): Promise<void> {
    return this.postCommandService.updateOne(id, updatePostDto, userId);
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string): Promise<void> {
    return this.postCommandService.deleteOne(id);
  }
}
