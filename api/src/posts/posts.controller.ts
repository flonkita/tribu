import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // <-- Import du Guard
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Route publique : Récupération de tous les articles
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  // Route protégée : Création d'un nouvel article
  @Post()
  @UseGuards(AuthGuard('jwt')) // <-- Le fameux bouclier
  @UsePipes(new ValidationPipe({ whitelist: true }))
  // L'objet Request (req) contient désormais les infos validées par la JwtStrategy
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: { user: { userId: string; username: string } },
  ) {
    // On passe le contenu ET l'ID de l'utilisateur au service
    return this.postsService.create(createPostDto, req.user.userId);
  }
}
