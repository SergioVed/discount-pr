import { Module } from '@nestjs/common';
import { RestaurantController } from '../controllers/RestaurantController';
import { RestaurantsService } from 'src/core/services/RestaurantService/RestaurantService';
import { RestaurantMapper } from 'src/infrastructure/db/mappers/RestaurantMapper';
import { RestaurantRepositoryImpl } from 'src/infrastructure/db/repository/RestaurantRepositoryImpl';
import { SequelizeModule } from '@nestjs/sequelize';
import { RestaurantModel } from 'src/infrastructure/db/entities/RestaurantModel';
import { GooglePlaceRepositoryImpl } from 'src/infrastructure/db/repository/GooglePlaceRepositoryImpl';
import { TokenModule } from './TokenModule';

@Module({
  imports: [SequelizeModule.forFeature([RestaurantModel]), TokenModule],
  providers: [
    RestaurantsService,
    RestaurantMapper,
    {
      provide: 'IRestaurantRepository',
      useClass: RestaurantRepositoryImpl,
    },
    {
      provide: 'IGooglePlaceRepository',
      useClass: GooglePlaceRepositoryImpl,
    },
  ],
  controllers: [RestaurantController],
  exports: ['IRestaurantRepository'],
})
export class RestaurantModule {}
