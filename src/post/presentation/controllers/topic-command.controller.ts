import { Controller, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ActionResponse, AuthRoles, UserRoles } from '#common';
import { TopicCommandService } from '#post/application/services';
import { UpdateTopicDto } from '#post/presentation/dto';

@ApiTags('topic - command')
@ApiBearerAuth()
@Controller('admin/topic')
@AuthRoles(UserRoles.ADMIN)
export class PostCommandController {
  public constructor(private readonly topicService: TopicCommandService) {}

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto): Promise<ActionResponse> {
    const post = await this.topicService.updateOne(id, updateTopicDto);
    return { id: post.id };
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string): Promise<void> {
    return this.topicService.deleteOne(id);
  }
}
