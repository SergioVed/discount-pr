import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';

export class ClaimRequestResponseMapper {
  static toResponse(request: ClaimRequest) {
    return {
      claimRequestId: request.claimRequestId,
      userId: request.userId,
      restaurantId: request.restaurantId,
      status: request.status,
    };
  }
}
