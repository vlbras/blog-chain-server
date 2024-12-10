import { Module } from '@nestjs/common';

import { PostApplicationModule } from './application/post-application.module';
import { PostCommandController } from './presentation/controllers/post-command.controller';
import { PostQueryController } from './presentation/controllers/post-query.controller';

@Module({
  imports: [PostApplicationModule],
  controllers: [PostCommandController, PostQueryController],
})
export class PostModule {}
