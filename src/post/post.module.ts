import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostAdminsController } from './controllers/post-admin.controller';
import { PostController } from './controllers/post.controller';
import { PostEntity, PostSchema } from './entities/post.entity';
import { PostAdminService } from './services/post-admin.service';
import { PostService } from './services/post.service';

import { TopicModule } from '#topic/topic.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]), TopicModule],
  controllers: [PostController, PostAdminsController],
  providers: [PostService, PostAdminService],
})
export class PostModule {}
