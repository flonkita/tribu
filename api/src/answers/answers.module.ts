import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { AnswersController } from './answers.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
