import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ClaimRequestService } from 'src/core/services/ClaimRequestService/ClaimRequestService';
import { CreatecClaimRequestDto } from './dto/CreateClaimRequestDto';
import { AuthGuard } from 'src/interface/guards/AuthGuard';
import { RoleGuard } from 'src/interface/guards/RoleGuard';
import { Roles } from 'src/interface/decorators/RoleDecorator';
import { IsActivated } from 'src/interface/guards/IsActivatedGuard';
import { UpdateClaimRequestDto } from './dto/UpdateClaimRequestDto';

@Controller('requests')
export class ClaimRequestController {
  constructor(private claimRequestService: ClaimRequestService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Post()
  async createRequest(@Body() dto: CreatecClaimRequestDto, @Req() req: any) {
    const restaurant = await this.claimRequestService.createRequest(dto, req);
    return restaurant;
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get()
  async getAllRequests() {
    const restaurants = await this.claimRequestService.getAllRequests();
    return restaurants;
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Put('/:id')
  async acceptRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateClaimRequestDto,
  ) {
    const request = await this.claimRequestService.updateRequest(
      id,
      body.status,
    );
    return request;
  }
}
