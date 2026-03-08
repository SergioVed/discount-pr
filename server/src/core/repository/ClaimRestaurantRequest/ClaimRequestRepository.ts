import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';
import { CreateRequestPersistenceDto } from './dto/CreateRequestPersistenceDto';
import { Transaction } from 'sequelize';

export interface IClaimRequestRepository {
  create(dto: CreateRequestPersistenceDto): Promise<ClaimRequest>;
  getAll(): Promise<ClaimRequest[]>;
  update(request: ClaimRequest, tx?: Transaction): Promise<ClaimRequest | null>;
  findById(requestId: number, tx: Transaction): Promise<ClaimRequest | null>;
}
