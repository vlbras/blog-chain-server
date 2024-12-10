import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TopicEntity, TopicSchema } from './entities';
import { PostEntity, PostSchema } from './entities/post.entity';
import { PostCommandRepository, PostQueryRepository, TopicRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostEntity.name, schema: PostSchema },
      { name: TopicEntity.name, schema: TopicSchema },
    ]),
  ],
  providers: [PostCommandRepository, PostQueryRepository, TopicRepository],
  exports: [PostCommandRepository, PostQueryRepository, TopicRepository],
})
export class PostInfrastructureModule {}
