import { Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSpecialOfferDto } from "src/core/repository/SpecialOfferRepository/dto/CreateSpecialOfferDto";
import { SpecialOfferService } from "src/core/services/SpecialOfferService/SpecialOfferService";


@Controller('offers')
export class SpecialOfferController {

    constructor (
        private specialOfferService: SpecialOfferService
    ) {}

    @Post()
    createOffer (dto: CreateSpecialOfferDto) {
        return this.specialOfferService.createOffer(dto)
    }

    @Get()
    getAllOffers () {
        return this.specialOfferService.getAllOffers()
    }

    @Get('/:restaurantId')
    getRestaurantOffers (@Param('restaurantId') restautantId: number) {
        return this.specialOfferService.getRestaurantOffer(restautantId)
    }
}