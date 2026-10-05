import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service.js';

// La route s'accroche logiquement à l'ID d'un article existant
@Controller('posts/:postId/media')
@UseGuards(AuthGuard('jwt'))
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // "file" sera le nom du champ attendu côté client
  async uploadMedia(
    @Param('postId') postId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("Aucun fichier n'a été fourni.");
    }

    // Déduction automatique du type pour Prisma (IMAGE ou VIDEO)
    const type = file.mimetype.startsWith('video') ? 'VIDEO' : 'IMAGE';

    return this.mediaService.uploadToPost(postId, file, type);
  }
}
