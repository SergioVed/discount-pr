import { InjectModel } from '@nestjs/sequelize';
import { SignInInvite } from 'src/core/entities/SignInInvite/SignInInvite';
import { CreateInvitePersistenceDto } from 'src/core/repository/SignInInviteRepository/dto/CreateInvitePersistenceDto';
import { ISignInInviteRepository } from 'src/core/repository/SignInInviteRepository/SignInInviteRepository';
import { SignInInviteModel } from '../entities/SignInInviteModel';
import { SignInInviteMapper } from '../mappers/SignInInviteMapper';
import { Transaction } from 'sequelize';

export class SignInInviteRepositoryImpl implements ISignInInviteRepository {
  constructor(
    private signInInviteMapper: SignInInviteMapper,
    @InjectModel(SignInInviteModel)
    private signInInviteModel: typeof SignInInviteModel,
  ) {}

  async create(dto: CreateInvitePersistenceDto): Promise<SignInInvite> {
    const persistence = this.signInInviteMapper.toCreationPersistance(dto);
    const invite = await this.signInInviteModel.create(persistence);
    return this.signInInviteMapper.toDomain(invite);
  }

  async getAll(): Promise<SignInInvite[]> {
    const invites = await this.signInInviteModel.findAll();
    return invites.map((e) => this.signInInviteMapper.toDomain(e));
  }

  async getInviteByToken(token: string, tx: Transaction): Promise<SignInInvite | null> {
    const invite = await this.signInInviteModel.findOne({ where: { token }, lock: tx.LOCK.UPDATE});
    if (!invite) {
      return null;
    }
    return this.signInInviteMapper.toDomain(invite);
  }

  async update(invite: SignInInvite, tx: Transaction): Promise<SignInInvite | null> {
    const persistance = this.signInInviteMapper.toPersistance(invite);
    const [affected] = await this.signInInviteModel.update(persistance, {
      where: { invite_id: persistance.invite_id },
      transaction: tx,
    });

    if (affected === 0) {
      return null;
    }
    return invite;
  }
}
