import { User } from 'src/core/entities/User/User';
import { UserModel } from '../entities/UserModel';
import { Injectable } from '@nestjs/common';
import { CreateUserPersistenceDto } from 'src/core/repository/UserRepository/dto/CreateUserPersistenceDto';

@Injectable()
export class UserPersistenceMapper {
  toDomain(entity: UserModel): User {
    return new User(
      entity.user_id,
      entity.first_name,
      entity.last_name,
      entity.role,
      entity.email,
      entity.password,
      entity.isActive,
    );
  }

  toPersistance(entity: User): any {
    return {
      user_id: entity.userId,
      first_name: entity.firstName,
      last_name: entity.lastName,
      role: entity.role,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive,
    };
  }

  toCreatePersistance(dto: CreateUserPersistenceDto) {
    return {
      first_name: dto.firstName,
      last_name: dto.lastName,
      role: dto.role,
      email: dto.email,
      password: dto.password,
    };
  }
}
