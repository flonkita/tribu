import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { EventsGateway } from '../events/events.gateway.js'; // <-- L'import du Gateway

@Injectable()
export class AnswersService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway, // <-- L'injection dans le constructeur
  ) {}

  async create(postId: string, userId: string, data: CreateAnswerDto) {
    // 1. On enregistre en base de données
    const answer = await this.prisma.comment.create({
      data: {
        content: data.content,
        postId: postId,
        authorId: userId,
      },
    });

    // 2. On déclenche le signal en temps réel vers tous les clients
    this.eventsGateway.emitNewAnswer(answer);

    return answer;
  }
}
