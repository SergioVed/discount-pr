import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSpecialOfferDto } from "src/core/repository/SpecialOfferRepository/dto/CreateSpecialOfferDto";
import { SpecialOfferService } from "src/core/services/SpecialOfferService/SpecialOfferService";


@Controller('offers')
export class SpecialOfferController {

    constructor (
        private specialOfferService: SpecialOfferService
    ) {}

    @Post()
    async createOffer (@Body() dto: CreateSpecialOfferDto) {
        return await this.specialOfferService.createOffer(dto)
    }

    @Get()
    async getAllOffers () {
        return await this.specialOfferService.getAllOffers()
    }

    @Get('/:restaurantId')
    async getRestaurantOffers (@Param('restaurantId') restautantId: number) {
        return await this.specialOfferService.getRestaurantOffer(restautantId)
    }
}