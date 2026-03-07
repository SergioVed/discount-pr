import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignInInviteService } from 'src/core/services/SignInInviteService/SignInInviteService';
import { RoleGuard } from '../../guards/RoleGuard';
import { Roles } from '../../decorators/RoleDecorator';
import { AuthGuard } from '../../guards/AuthGuard';
import { IsActivated } from '../../guards/IsActivatedGuard';
import { CreateInviteRequestDto } from './dto/CreateInviteRequestDto';

@Controller('invites')
export class SignInInviteController {
  constructor(private signInInviteService: SignInInviteService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Post()
  async createInvite(@Body() dto: CreateInviteRequestDto, @Req() req: any) {
    const invite = await this.signInInviteService.createInvite({
      ...dto,
      createdBy: req.user._userId,
    });
    return invite;
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get()
  async getAllInvites() {
    const invites = await this.signInInviteService.getAllInvites();
    return invites;
  }
}
