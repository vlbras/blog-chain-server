import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PostCommandService, PostQueryService } from './services';

import { PostInfrastructureModule } from '#post/infrastructure/post-infrastructure.module';
import { UserIntegrationModule } from '#user/integration/user-integration.module';

@Module({
  imports: [CqrsModule.forRoot(), PostInfrastructureModule, UserIntegrationModule],
  providers: [PostCommandService, PostQueryService],
  exports: [PostCommandService, PostQueryService],
})
export class PostApplicationModule {}