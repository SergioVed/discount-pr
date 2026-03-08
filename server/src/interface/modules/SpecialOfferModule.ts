import { Module } from '@nestjs/common';
import { SpecialOfferController } from '../controllers/specialOffer/SpecialOfferController';
import { SpecialOfferService } from 'src/core/services/SpecialOfferService/SpecialOfferService';
import { SpecialOfferRepositoryImpl } from 'src/infrastructure/db/repository/SpecialOfferRepositoryImpl';
import { SpecialOfferMapper } from 'src/infrastructure/db/mappers/SpecialOfferMapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecialOfferModel } from 'src/infrastructure/db/entities/SpecialOfferModel';
import { TokenHelper } from 'src/helpers/token/tokenHelper';
import { TokenModule } from './TokenModule';
import { RestaurantModule } from './RestaurantModule';

@Module({
  imports: [SequelizeModule.forFeature([SpecialOfferModel]), TokenModule, RestaurantModule],
  providers: [
    SpecialOfferService,
    SpecialOfferMapper,
    TokenHelper,
    {
      provide: 'ISpecialOfferRepository',
      useClass: SpecialOfferRepositoryImpl,
    }
  ],
  controllers: [SpecialOfferController],
})
export class SpecialOfferModule {}
