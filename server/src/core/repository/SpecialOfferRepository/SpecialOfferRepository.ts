import { SpecialOffer } from "src/core/entities/SpecialOffer/SpecialOffer";
import { CreateSpecialOfferDto } from "./dto/CreateSpecialOfferDto";

export interface ISpecialOfferRepository {
    createOffer(dto: CreateSpecialOfferDto): Promise<SpecialOffer>
    getAllOffers(): Promise<SpecialOffer[]>
    getRestaurantOffers(restaurantId: number): Promise<SpecialOffer[] | null>
}