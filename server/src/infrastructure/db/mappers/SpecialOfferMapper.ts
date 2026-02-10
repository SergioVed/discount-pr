import { SpecialOffer } from "src/core/entities/SpecialOffer/SpecialOffer"
import { SpecialOfferModel } from "../entities/SpecialOfferModel"

interface Mapper <T, E> {
    toDomain(entity: T): E
    toModel(entity: E): any
}

export class SpecialOfferMapper implements Mapper<SpecialOfferModel, SpecialOffer> {
    toDomain(entity: SpecialOfferModel): SpecialOffer {
        return new SpecialOffer (
            entity.special_offer_id,
            entity.creared_by,
            entity.restaurant_id,
            entity.title,
            entity.description,
            entity.isActive,
            entity.active_from,
            entity.active_to
        )
    }
    toModel(entity: SpecialOffer) {
        return {
            special_offer_id: entity.specialOfferId,
            creared_by: entity.createdBy,
            restaurant_id: entity.restaurantId,
            title: entity.title,
            description: entity.description,
            isActive: entity.isActive,
            active_from: entity.activeFrom,
            active_to: entity.activeTo
        }
    }
}