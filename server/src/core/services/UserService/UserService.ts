import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';
import { CreateUserPersistenceDto } from 'src/core/repository/UserRepository/dto/CreateUserPersistenceDto';
import type { IUserRepository } from 'src/core/repository/UserRepository/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  async createUser(dto: CreateUserPersistenceDto, tx: Transaction) {
    return await this.userRepository.create(dto, tx);
  }

  async findUserByEmail(email: string, tx?: Transaction) {
    return await this.userRepository.findUserByEmail(email, tx);
  }

  async activateUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new EntityNotFoundError('User', id);
    }
    user.activate();
    return this.userRepository.update(user);
  }
}
