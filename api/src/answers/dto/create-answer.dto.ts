import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty({ message: 'La réponse ne peut pas être vide' })
  content: string;
}
