import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClaimRequestModel } from 'src/infrastructure/db/entities/ClaimRequestModel';
import { ClaimRequestService } from 'src/core/services/ClaimRequestService/ClaimRequestService';
import { ClaimRequestMapper } from 'src/infrastructure/db/mappers/ClaimRequestMapper';
import { ClaimRequestController } from '../controllers/claimRestaurantRequest/ClaimRequestController';
import { ClaimRequestRepositoryImpl } from 'src/infrastructure/db/repository/ClaimRequestRepositoryImpl';
import { UsersModule } from './UserModule';
import { RestaurantModule } from './RestaurantModule';
import { TokenHelper } from 'src/helpers/token/tokenHelper';
import { TokenModule } from './TokenModule';

@Module({
  imports: [
    SequelizeModule.forFeature([ClaimRequestModel]),
    UsersModule,
    RestaurantModule,
    TokenModule
  ],
  providers: [
    ClaimRequestService,
    ClaimRequestMapper,
    TokenHelper,
    {
      provide: 'IClaimRequestRepository',
      useClass: ClaimRequestRepositoryImpl,
    },
  ],
  controllers: [ClaimRequestController],
})
export class ClaimRequestModule {}
