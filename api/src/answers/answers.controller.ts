import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnswersService } from './answers.service.js';
import { CreateAnswerDto } from './dto/create-answer.dto.js';

@Controller('posts') // Remarque : on se greffe sur la route posts !
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':postId/answers')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createAnswerDto: CreateAnswerDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.answersService.create(postId, req.user.userId, createAnswerDto);
  }
}
