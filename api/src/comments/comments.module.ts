import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service.js';
import { CommentsController } from './comments.controller.js';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
