import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 1. Vérifier si l'utilisateur existe déjà pour éviter les doublons
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: registerDto.email }, { username: registerDto.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Cet email ou ce pseudo est déjà pris.');
    }

    // 2. Hacher le mot de passe (le "salt round" de 10 est le standard de l'industrie)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // 3. Enregistrer l'utilisateur dans PostgreSQL
    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        username: registerDto.username,
        password: hashedPassword,
      },
    });

    // 4. Sécurité : extraire et retirer le mot de passe haché de l'objet de retour
    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async login(loginDto: LoginDto) {
    // 1. Chercher l'utilisateur par son email
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    // 2. Comparer le mot de passe fourni avec le hachage en base de données
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    // 3. Si tout est valide, générer le jeton JWT
    const payload = { sub: user.id, username: user.username, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
