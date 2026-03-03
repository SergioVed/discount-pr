import { Inject } from "@nestjs/common";
import { InvalidStatusError } from "src/core/errors/cases/application/claimRequest/InvalidStatusError";
import { EntityNotFoundError } from "src/core/errors/cases/application/shared/EntityNotFoundError";
import type { IClaimRequestRepository } from "src/core/repository/ClaimRestaurantRequest/ClaimRequestRepository";
import type { IUserRepository } from "src/core/repository/UserRepository/UserRepository";
import type { IRestaurantRepository } from "src/core/repository/RestaurantRepository/RestaurantRepository";
import { CreateRequestDto } from "src/core/repository/ClaimRestaurantRequest/dto/CreateRequestDto";


export class ClaimRequestService {

    constructor (
        @Inject('IClaimRequestRepository') private claimRequestRepository: IClaimRequestRepository,
        @Inject('IUserRepository') private userRepository: IUserRepository,
        @Inject('IRestaurantRepository') private restaurantRepository: IRestaurantRepository
    ) {}

    async createRequest (dto: CreateRequestDto) {
        const request = this.claimRequestRepository.create(dto)
        return request
    }

    async getAllRequests () {
        const requests = this.claimRequestRepository.getAll()
        return requests
    }

    async updateRequest (requestId: number, status: 'ACCEPTED' | 'DECLINED') {
        const request = await this.claimRequestRepository.findById(requestId)
        if (!request) {
            throw new EntityNotFoundError("Request", requestId)
        }
        if (request.status !== "PENDING") {
            throw new InvalidStatusError(request.status)
        }

        const user = await this.userRepository.findById(request.userId)
        if (!user) {
            throw new EntityNotFoundError("User", request.userId)
        }
        const restaurant = await this.restaurantRepository.findById(request.restaurantId)
        if (!restaurant) {
            throw new EntityNotFoundError("Restaurant", request.restaurantId)
        }

        if (status === 'ACCEPTED') {
            request.accept()
            restaurant.assignManager(request.userId)
            await this.restaurantRepository.update(restaurant)
        } else if (status === 'DECLINED') {
            request.decline()
        }
        await this.claimRequestRepository.update(request)

        return request
    }

}