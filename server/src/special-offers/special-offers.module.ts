import { Module } from '@nestjs/common';
import { SpecialOffersController } from './special-offers.controller';
import { SpecialOffersService } from './special-offers.service';
import { Special_offer } from './special-offer.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Special_offer])],
  controllers: [SpecialOffersController],
  providers: [SpecialOffersService]
})
export class SpecialOffersModule {}
