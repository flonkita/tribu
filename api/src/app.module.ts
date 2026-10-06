import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { PostsModule } from './posts/posts.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MediaModule } from './media/media.module.js';
import { CommentsModule } from './comments/comments.module.js';
import { AnswersModule } from './answers/answers.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PostsModule,
    AuthModule,
    MediaModule,
    CommentsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
