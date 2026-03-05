import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';
import { CreateRequestDto } from './dto/CreateRequestDto';

export interface IClaimRequestRepository {
  create(dto: CreateRequestDto): Promise<ClaimRequest>;
  getAll(): Promise<ClaimRequest[]>;
  update(request: ClaimRequest): Promise<ClaimRequest | null>;
  findById(requestId: number): Promise<ClaimRequest | null>;
}
