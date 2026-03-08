import { Inject } from '@nestjs/common';
import { InvalidStatusError } from 'src/core/errors/cases/application/claimRequest/InvalidStatusError';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';
import type { IClaimRequestRepository } from 'src/core/repository/ClaimRestaurantRequest/ClaimRequestRepository';
import type { IUserRepository } from 'src/core/repository/UserRepository/UserRepository';
import type { IRestaurantRepository } from 'src/core/repository/RestaurantRepository/RestaurantRepository';
import { CreateClaimRequestInput } from './types';
import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';
import { User } from 'src/core/entities/User/User';
import { Restaurant } from 'src/core/entities/Restaurant/Restaurant';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

export class ClaimRequestService {
  constructor(
    @Inject('IClaimRequestRepository') private claimRequestRepository: IClaimRequestRepository,
    @Inject('IUserRepository') private userRepository: IUserRepository,
    @Inject('IRestaurantRepository') private restaurantRepository: IRestaurantRepository,
    private sequelize: Sequelize
  ) { }

  async createRequest(dto: CreateClaimRequestInput, req: any) {
    const request = this.claimRequestRepository.create({ ...dto, userId: req.user._userId });
    return request;
  }

  async getAllRequests() {
    const requests = this.claimRequestRepository.getAll();
    return requests;
  }

  async updateRequest(requestId: number, status: 'ACCEPTED' | 'DECLINED') {
    return await this.sequelize.transaction(async (tx: Transaction) => {
      const request = await this.getPendingRequestOrThrow(requestId, tx)
      const { user, restaurant } = await this.loadEntitiesOrThrow(request, tx)

      const decision = await this.aplyDecision(request, restaurant, status)
      await this.persistDecision(request, restaurant, tx, decision)

      return request;
    })
  }

  private async getPendingRequestOrThrow(requestId: number, tx: Transaction): Promise<ClaimRequest> {
    const request = await this.claimRequestRepository.findById(requestId, tx);
    if (!request) {
      throw new EntityNotFoundError('Request', requestId);
    }
    if (request.status !== 'PENDING') {
      throw new InvalidStatusError(request.status);
    }
    return request
  }

  private async loadEntitiesOrThrow(request: ClaimRequest, tx: Transaction): Promise<{ user: User, restaurant: Restaurant }> {
    const user = await this.userRepository.findById(request.userId, tx);
    if (!user) {
      throw new EntityNotFoundError('User', request.userId);
    }
    const restaurant = await this.restaurantRepository.findById(request.restaurantId, tx);
    if (!restaurant) {
      throw new EntityNotFoundError('Restaurant', request.restaurantId);
    }

    return {
      user,
      restaurant
    }
  }

  private async aplyDecision(request: ClaimRequest, restaurant: Restaurant, status: 'ACCEPTED' | 'DECLINED'): Promise<'ACCEPTED' | 'DECLINED'> {
    if (status === 'ACCEPTED') {
      request.accept();
      restaurant.assignManager(request.userId);
    } else if (status === 'DECLINED') {
      request.decline();
    }

    return status
  }

  private async persistDecision(request: ClaimRequest, restaurant: Restaurant, tx: Transaction, status: 'ACCEPTED' | 'DECLINED') {
    if (status === 'ACCEPTED') {
      const updatedRestaurant = await this.restaurantRepository.update(restaurant, tx);
      if (!updatedRestaurant) {
        throw new EntityNotFoundError('Restaurant', restaurant.restaurantId);
      }

      const updatedRequest = await this.claimRequestRepository.update(request, tx);
      if (!updatedRequest) {
        throw new EntityNotFoundError('Request', request.claimRequestId);
      }
    } else if (status === 'DECLINED') {
      
      const updatedRequest = await this.claimRequestRepository.update(request, tx);
      if (!updatedRequest) {
        throw new EntityNotFoundError('Request', request.claimRequestId);
      }
    }
  }
}
