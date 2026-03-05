import { UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/core/services/TokenService/TokenService';

export const extractToken = (request: any, tokenService: TokenService) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException('Missing headers');
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  if (!bearer || !token) {
    throw new UnauthorizedException('Missing bearer or token');
  }

  request.user = tokenService.validateAccess(token);
};
