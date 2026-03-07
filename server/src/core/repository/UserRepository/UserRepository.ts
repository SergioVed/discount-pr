import { User } from 'src/core/entities/User/User';
import { CreateUserPersistenceDto } from './dto/CreateUserPersistenceDto';
import { Transaction } from 'sequelize';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(dto: CreateUserPersistenceDto, tx: Transaction): Promise<User>;
  findUserByEmail(email: string, tx?: Transaction): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<User | null>;
}
