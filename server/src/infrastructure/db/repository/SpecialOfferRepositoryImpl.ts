import { InjectModel } from "@nestjs/sequelize";
import { SpecialOffer } from "src/core/entities/SpecialOffer/SpecialOffer";
import { CreateSpecialOfferDto } from "src/core/repository/SpecialOfferRepository/dto/CreateSpecialOfferDto";
import { ISpecialOfferRepository } from "src/core/repository/SpecialOfferRepository/SpecialOfferRepository";
import { SpecialOfferModel } from "../entities/SpecialOfferModel";
import { SpecialOfferMapper } from "../mappers/SpecialOfferMapper";


export class SpecialOfferRepositoryImpl implements ISpecialOfferRepository {

    constructor (
        @InjectModel(SpecialOfferModel) private specialOfferModel: typeof SpecialOfferModel,
        private specialOfferMapper: SpecialOfferMapper
    ) {}

    async createOffer(dto: CreateSpecialOfferDto): Promise<SpecialOffer> {
        const modelData = {
            creared_by: dto.crearedBy,
            restaurant_id: dto.restaurantId,
            title: dto.title,
            description: dto.description,
            isActive: dto.isActive,
            active_from: dto.activeFrom,
            active_to: dto.activeTo
        }
        const offer = await this.specialOfferModel.create(modelData)
        return this.specialOfferMapper.toDomain(offer)
    }
    async getAllOffers(): Promise<SpecialOffer[]> {
        const offers = await this.specialOfferModel.findAll()
        return offers.map(e => this.specialOfferMapper.toDomain(e))
    }
    async getRestaurantOffers(restaurantId: number): Promise<SpecialOffer[] | null> {
        const offers = await this.specialOfferModel.findAll({where: {restaurant_id: restaurantId}})
        return offers.map(e => this.specialOfferMapper.toDomain(e))
    }
    
}