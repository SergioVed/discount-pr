import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SpecialOfferService } from 'src/core/services/SpecialOfferService/SpecialOfferService';
import { CreateSpecialOfferRequestDto } from './dto/CreateSpecialOfferRequestDto';
import { Roles } from 'src/interface/decorators/RoleDecorator';
import { AuthGuard } from 'src/interface/guards/AuthGuard';
import { IsActivated } from 'src/interface/guards/IsActivatedGuard';
import { RoleGuard } from 'src/interface/guards/RoleGuard';
import { SpecialOfferResponseMapper } from './mapper/SpecialOfferResponseMapper';

@Controller('offers')
export class SpecialOfferController {
  constructor(private specialOfferService: SpecialOfferService) {}

  @Roles('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Post()
  async createOffer(@Body() dto: CreateSpecialOfferRequestDto, @Req() req: any) {
    const offer = await this.specialOfferService.createOffer(dto, req.user._userId);
    return SpecialOfferResponseMapper.toResponse(offer);
  }

  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get()
  async getAllOffers() {
    const offers = await this.specialOfferService.getAllOffers();
    return offers.map((offer) => SpecialOfferResponseMapper.toResponse(offer));
  }

  @Roles('ADMIN', 'MANAGER')
  @UseGuards(AuthGuard, RoleGuard, IsActivated)
  @Get('/:restaurantId')
  async getRestaurantOffers(
    @Param('restaurantId', ParseIntPipe) restautantId: number,
  ) {
    const offers = await this.specialOfferService.getRestaurantOffer(restautantId);
    return offers.map((offer) => SpecialOfferResponseMapper.toResponse(offer));
  }
}
