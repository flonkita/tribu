import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'Le commentaire doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le commentaire ne peut pas être vide.' })
  @MaxLength(500, {
    message: 'Le commentaire ne peut pas dépasser 500 caractères.',
  })
  content: string;
}
