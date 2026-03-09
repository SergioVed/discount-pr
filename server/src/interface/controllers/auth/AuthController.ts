import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/CreateUserRequestDto';
import { AuthService } from 'src/core/services/AuthService/AuthService';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { AuthResponseMapper } from './mapper/AuthResponseMapper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    const result = await this.authService.login(body);
    return AuthResponseMapper.toLoginResponse(result.candidate, result.tokens);
  }

  @Post('register/:token')
  async register(
    @Body() dto: CreateUserRequestDto,
    @Param('token', ParseUUIDPipe) token: string,
  ) {
    const result = await this.authService.register(dto, token);
    return AuthResponseMapper.toRegisterResponse(result.user, result.tokens);
  }
}
