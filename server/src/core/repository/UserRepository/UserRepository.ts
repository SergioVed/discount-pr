import { User } from 'src/core/entities/User/User';
import { CreateUserPersistenceDto } from './dto/CreateUserPersistenceDto';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(dto: CreateUserPersistenceDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(user: User): Promise<User | null>;
}
