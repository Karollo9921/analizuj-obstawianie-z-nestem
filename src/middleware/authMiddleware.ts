import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;

    if (token) {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      });

      if (!payload) {
        res.redirect('/auth/login');
        return;
      }
    } else {
      res.redirect('/auth/login');
      return;
    }

    next();
  }
}
