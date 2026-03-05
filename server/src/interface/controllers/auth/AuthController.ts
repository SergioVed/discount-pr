import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/CreateUserRequestDto';
import { AuthService } from 'src/core/services/AuthService/AuthService';
import { LoginRequestDto } from './dto/LoginRequestDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    return await this.authService.login(body);
  }

  @Post('register/:token')
  async register(
    @Body() dto: CreateUserRequestDto,
    @Param('token') token: string,
  ) {
    return await this.authService.register(dto, token);
  }
}
