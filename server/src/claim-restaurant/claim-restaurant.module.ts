import { Module } from '@nestjs/common';
import { ClaimRestaurantController } from './claim-restaurant.controller';
import { ClaimRestaurantService } from './claim-restaurant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Restaurant } from 'src/restaurants/restaurant.model';
import { Claim_request } from './claim-restaurant.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Restaurant, Claim_request])],
  controllers: [ClaimRestaurantController],
  providers: [ClaimRestaurantService]
})
export class ClaimRestaurantModule {}
