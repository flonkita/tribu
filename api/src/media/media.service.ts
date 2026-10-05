import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { extname } from 'path';
import 'multer'; // <-- Import de multer pour le type Express.Multer.File

@Injectable()
export class MediaService {
  private supabase: SupabaseClient;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    // Initialisation du client Supabase avec tes variables d'environnement
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadToPost(
    postId: string,
    file: Express.Multer.File,
    mediaType: 'IMAGE' | 'VIDEO',
  ) {
    // 1. Créer un nom unique pour éviter d'écraser des fichiers du même nom
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = extname(file.originalname);
    const fileName = `${postId}/${uniqueSuffix}${fileExt}`; // Range l'image dans un sous-dossier au nom du Post

    // 2. Expédier le fichier dans le bucket Supabase
    const { data, error } = await this.supabase.storage
      .from('medias')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new InternalServerErrorException(
        "Erreur lors de l'upload vers Supabase : " + error.message,
      );
    }

    // 3. Récupérer l'URL publique générée par Supabase
    const { data: publicUrlData } = this.supabase.storage
      .from('medias')
      .getPublicUrl(fileName);

    // 4. Enregistrer le média en base de données avec Prisma
    return this.prisma.media.create({
      data: {
        url: publicUrlData.publicUrl,
        type: mediaType,
        postId: postId,
      },
    });
  }
}
