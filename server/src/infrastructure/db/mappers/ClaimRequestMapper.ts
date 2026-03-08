import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';
import { ClaimRequestModel } from '../entities/ClaimRequestModel';
import { CreateRequestPersistenceDto } from 'src/core/repository/ClaimRestaurantRequest/dto/CreateRequestPersistenceDto';

export class ClaimRequestMapper {
  toDomain(entity: ClaimRequestModel): ClaimRequest {
    return new ClaimRequest(
      entity.claim_request_id,
      entity.user_id,
      entity.restaurant_id,
      entity.status,
    );
  }
  toPersistence(entity: ClaimRequest) {
    return {
      claim_request_id: entity.claimRequestId,
      user_id: entity.userId,
      restaurant_id: entity.restaurantId,
      status: entity.status,
    };
  }
  toCreationPersistence(dto: CreateRequestPersistenceDto) {
    return {
      user_id: dto.userId,
      restaurant_id: dto.restaurantId,
      status: 'PENDING',
    };
  }
}
