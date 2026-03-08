import { InjectModel } from '@nestjs/sequelize';
import { SpecialOffer } from 'src/core/entities/SpecialOffer/SpecialOffer';
import { ISpecialOfferRepository } from 'src/core/repository/SpecialOfferRepository/SpecialOfferRepository';
import { SpecialOfferModel } from '../entities/SpecialOfferModel';
import { SpecialOfferMapper } from '../mappers/SpecialOfferMapper';

export class SpecialOfferRepositoryImpl implements ISpecialOfferRepository {
  constructor(
    @InjectModel(SpecialOfferModel)
    private specialOfferModel: typeof SpecialOfferModel,
    private specialOfferMapper: SpecialOfferMapper,
  ) {}

  async create(specialOffer: SpecialOffer): Promise<SpecialOffer> {
    const persistence = this.specialOfferMapper.toCreationPersistence(specialOffer)
    const offer = await this.specialOfferModel.create(persistence);
    return this.specialOfferMapper.toDomain(offer);
  }


  async getAll(): Promise<SpecialOffer[]> {
    const offers = await this.specialOfferModel.findAll({
      include: { all: true },
    });
    return offers.map((e) => this.specialOfferMapper.toDomain(e));
  }


  async getRestaurantOffers(restaurantId: number): Promise<SpecialOffer[]> {
    const offers = await this.specialOfferModel.findAll({
      where: { restaurant_id: restaurantId },
    });
    return offers.map((e) => this.specialOfferMapper.toDomain(e));
  }
}
