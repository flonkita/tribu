import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { AnswersController } from './answers.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [PrismaModule, EventsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
