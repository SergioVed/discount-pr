import { Body, Controller, Post } from '@nestjs/common';
import { CreateSpecialOfferDto } from './dto/special-offer.dto';
import { SpecialOffersService } from './special-offers.service';

@Controller('special-offers')
export class SpecialOffersController {

    constructor (private specialOffersService: SpecialOffersService) {}

    @Post()
    async createSpecialOffer (@Body() dto: CreateSpecialOfferDto) {
        const special_offer = await this.specialOffersService.createSpecialOffer(dto)
        return special_offer
    }   
}
