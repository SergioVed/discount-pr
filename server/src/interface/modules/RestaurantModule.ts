import { Module } from "@nestjs/common";
import { RestaurantController } from "../controllers/RestaurantController";
import { RestaurantsService } from "src/core/services/RestaurantService/RestaurantService";
import { RestaurantMapper } from "src/infrastructure/db/mappers/RestaurantMapper";
import { RestaurantRepositoryImpl } from "src/infrastructure/db/repository/RestaurantRepositoryImpl";
import { SequelizeModule } from "@nestjs/sequelize";
import { RestaurantModel } from "src/infrastructure/db/entities/RestaurantModel";


@Module({
    imports: [SequelizeModule.forFeature([RestaurantModel])],
    providers: [RestaurantsService, RestaurantMapper, {
        provide: 'IRestaurantRepository',
        useClass: RestaurantRepositoryImpl
    }],
    controllers: [RestaurantController]
})

export class RestaurantModule {}