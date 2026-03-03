import { Restaurant } from "src/core/entities/Restaurant/Restaurant";
import { CreateRestaurantDto } from "./dto/CreateRestaurantDto";
import { UpdateRestaurantDto } from "./dto/UpdateRestarauntDto";


export interface IRestaurantRepository {
    create(data: CreateRestaurantDto): Promise<Restaurant>
    update(restaurant: Restaurant): Promise<Restaurant | null>
    findById(restaurantId: number): Promise<Restaurant | null>
    getAll(): Promise<Restaurant[]>
}