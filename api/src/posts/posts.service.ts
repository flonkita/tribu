import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: {
        content: data.content,
        // Simulation d'un auteur en attendant le module Auth
        authorId: userId, // Remplacez par l'ID de l'utilisateur authentifié
      },
    });
  }
  async findAll() {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc', // Trie du plus récent au plus ancien
      },
      include: {
        author: {
          select: {
            username: true,
            avatarUrl: true,
          },
        },
      },
    });
  }
}
