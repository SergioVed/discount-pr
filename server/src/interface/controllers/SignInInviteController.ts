import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateInviteClientDto } from 'src/core/repository/SignInInviteRepository/dto/CreateInviteClientDto';
import { SignInInviteService } from 'src/core/services/SignInInviteService/SignInInviteService';
import { RoleGuard } from '../guards/RoleGuard';
import { Roles } from '../decorators/RoleDecorator';
import { AuthGuard } from '../guards/AuthGuard';
import { IsActivated } from '../guards/IsActivatedGuard';

@Controller('invites')
export class SignInInviteController {
  constructor(private signInInviteService: SignInInviteService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Post()
  async createInvite(@Body() dto: CreateInviteClientDto, @Req() req: any) {
    const invite = await this.signInInviteService.createInvite({
      ...dto,
      createdBy: req.user._userId,
    });
    return invite;
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllInvites() {
    const invites = await this.signInInviteService.getAllInvites();
    return invites;
  }
}
