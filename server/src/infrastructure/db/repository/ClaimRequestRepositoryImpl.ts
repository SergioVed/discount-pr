import { InjectModel } from '@nestjs/sequelize';
import { ClaimRequest } from 'src/core/entities/ClaimRestaurantRequest/ClaimRestaurantRequest';
import { IClaimRequestRepository } from 'src/core/repository/ClaimRestaurantRequest/ClaimRequestRepository';
import { CreateRequestPersistenceDto } from 'src/core/repository/ClaimRestaurantRequest/dto/CreateRequestPersistenceDto';
import { ClaimRequestModel } from '../entities/ClaimRequestModel';
import { ClaimRequestMapper } from '../mappers/ClaimRequestMapper';
import { Transaction } from 'sequelize';

export class ClaimRequestRepositoryImpl implements IClaimRequestRepository {
  constructor(
    @InjectModel(ClaimRequestModel)
    private claimRequestModel: typeof ClaimRequestModel,
    private claimRequestMapper: ClaimRequestMapper,
  ) {}

  async findById(requestId: number, tx: Transaction): Promise<ClaimRequest | null> {
    const request = await this.claimRequestModel.findByPk(requestId, {transaction: tx, lock: tx.LOCK.UPDATE});
    if (!request) {
      return null;
    }
    return this.claimRequestMapper.toDomain(request);
  }

  async create(dto: CreateRequestPersistenceDto): Promise<ClaimRequest> {
    const persistence = this.claimRequestMapper.toCreationPersistence(dto);
    const request = await this.claimRequestModel.create(persistence);
    return this.claimRequestMapper.toDomain(request);
  }

  async getAll(): Promise<ClaimRequest[]> {
    const requests = await this.claimRequestModel.findAll();
    return requests.map((e) => this.claimRequestMapper.toDomain(e));
  }

  async update(request: ClaimRequest, tx: Transaction): Promise<ClaimRequest | null> {
    const persistence = this.claimRequestMapper.toPersistence(request);
    const [affected] = await this.claimRequestModel.update(persistence, {
      where: { claim_request_id: persistence.claim_request_id },
      transaction: tx
    });
    if (affected === 0) {
      return null;
    }
    return request;
  }
}
