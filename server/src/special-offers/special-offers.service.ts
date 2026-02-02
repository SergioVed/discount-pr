import { Injectable } from '@nestjs/common';
import { CreateSpecialOfferDto } from './dto/special-offer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Special_offer } from './special-offer.model';

@Injectable()
export class SpecialOffersService {

    constructor(@InjectModel(Special_offer) private special_offer_repo: typeof Special_offer){}

    async createSpecialOffer (dto: CreateSpecialOfferDto) {
        const offer = await this.special_offer_repo.create(dto)
        return offer
    }
}
