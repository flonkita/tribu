import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAnswerDto } from './dto/create-answer.dto.js';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async create(postId: string, userId: string, data: CreateAnswerDto) {
    // Le secret est ici : on interagit avec this.prisma.comment
    return this.prisma.comment.create({
      data: {
        content: data.content,
        postId: postId,
        authorId: userId,
      },
    });
  }
}
