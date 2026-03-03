import { Inject, Injectable } from "@nestjs/common";
import { CreateSpecialOfferDto } from "src/core/repository/SpecialOfferRepository/dto/CreateSpecialOfferDto";
import type { ISpecialOfferRepository } from "src/core/repository/SpecialOfferRepository/SpecialOfferRepository";

@Injectable()
export class SpecialOfferService {

    constructor (
        @Inject('ISpecialOfferRepository') private specialOfferRepository: ISpecialOfferRepository
    ) {}

    async createOffer (dto: CreateSpecialOfferDto) {
        const offer = await this.specialOfferRepository.create(dto)
        return offer
    }

    async getAllOffers () {
        const offers = await this.specialOfferRepository.getAll()
        return offers
    }

    async getRestaurantOffer (restaurantId: number) {
        const offers = await this.specialOfferRepository.getRestaurantOffers(restaurantId)
        return offers
    }

}