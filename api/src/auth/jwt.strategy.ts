import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // On dit au douanier de chercher le jeton dans le header d'autorisation (Bearer Token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // On utilise la même clé secrète que pour le cryptage
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'clef-secrete-provisoire',
    });
  }

  // Cette fonction s'exécute automatiquement si le jeton est valide
  async validate(payload: any) {
    // Le 'payload' correspond exactement à l'objet que nous avons signé dans auth.service.ts
    // On renvoie l'ID et l'username, qui seront injectés dans l'objet "Request" de NestJS
    return { userId: payload.sub, username: payload.username };
  }
}
