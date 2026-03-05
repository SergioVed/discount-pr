import { Module } from '@nestjs/common';
import { SpecialOfferController } from '../controllers/SpecialOfferController';
import { SpecialOfferService } from 'src/core/services/SpecialOfferService/SpecialOfferService';
import { SpecialOfferRepositoryImpl } from 'src/infrastructure/db/repository/SpecialOfferRepositoryImpl';
import { SpecialOfferMapper } from 'src/infrastructure/db/mappers/SpecialOfferMapper';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecialOfferModel } from 'src/infrastructure/db/entities/SpecialOfferModel';

@Module({
  imports: [SequelizeModule.forFeature([SpecialOfferModel])],
  providers: [
    SpecialOfferService,
    SpecialOfferMapper,
    {
      provide: 'ISpecialOfferRepository',
      useClass: SpecialOfferRepositoryImpl,
    },
  ],
  controllers: [SpecialOfferController],
})
export class SpecialOfferModule {}
