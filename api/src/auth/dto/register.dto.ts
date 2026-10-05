import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le pseudo est obligatoire' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;
}
