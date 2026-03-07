import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ITokenRepository } from 'src/core/repository/TokenRepository/TokenRepository';
import { Payload } from './payload';
import { CreateTokenPersistenceDto } from 'src/core/repository/TokenRepository/dto/CreateTokenPersistenceDto';
import { Transaction } from 'sequelize';

@Injectable()
export class TokenService {
  constructor(
    @Inject('ITokenRepository') private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  generateTokens(payload: Payload) {
    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '30m',
      },
    );

    const refreshToken = this.jwtService.sign(
      { ...payload },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '15d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(dto: CreateTokenPersistenceDto, tx?: Transaction) {
    const token = await this.tokenRepository.getOne(dto.userId, tx);
    if (token) {
      return await this.tokenRepository.update(token.tokenId, dto.token, tx);
    }
    return await this.tokenRepository.create(dto, tx);
  }

  validateRefresh(refresh: string) {
    try {
      const userData = this.jwtService.verify(refresh, {
        secret: process.env.REFRESH_SECRET,
      });
      return userData;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }

  validateAccess(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.ACCESS_SECRET,
      });
      return userData;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
