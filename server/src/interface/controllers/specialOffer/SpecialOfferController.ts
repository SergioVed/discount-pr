import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { SpecialOfferService } from 'src/core/services/SpecialOfferService/SpecialOfferService';
import { CreateSpecialOfferRequestDto } from './dto/CreateSpecialOfferRequestDto';
import { Roles } from 'src/interface/decorators/RoleDecorator';
import { AuthGuard } from 'src/interface/guards/AuthGuard';
import { IsActivated } from 'src/interface/guards/IsActivatedGuard';
import { RoleGuard } from 'src/interface/guards/RoleGuard';

@Controller('offers')
export class SpecialOfferController {
  constructor(private specialOfferService: SpecialOfferService) {}

  @Roles('MANAGER')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Post()
  async createOffer(@Body() dto: CreateSpecialOfferRequestDto, @Req() req: any) {
    return await this.specialOfferService.createOffer(dto, req.user._userId);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get()
  async getAllOffers() {
    return await this.specialOfferService.getAllOffers();
  }

  @Roles('ADMIN', 'MANAGER')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get('/:restaurantId')
  async getRestaurantOffers(@Param('restaurantId', ParseIntPipe) restautantId: number) {
    return await this.specialOfferService.getRestaurantOffer(restautantId);
  }
}
