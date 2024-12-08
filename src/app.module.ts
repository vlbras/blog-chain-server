import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from '@unifig/core';
import { ConfigModule } from '@unifig/nest';

import { AppOptions } from './app.options';

import { AuthModule } from '#auth/auth.module';
import { AccessTokenGuard } from '#auth/presentation/guards/access-token.guard';
import { PostModule } from '#post/post.module';
import { TopicModule } from '#topic/topic.module';
import { UserModule } from '#user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ default: AppOptions }),
    MongooseModule.forRoot(Config.getValues(AppOptions).mongoUri),
    UserModule,
    AuthModule,
    TopicModule,
    PostModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
