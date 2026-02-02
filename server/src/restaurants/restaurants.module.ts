import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Restaurant } from './restaurant.model';

@Module({
  imports: [SequelizeModule.forFeature([Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
