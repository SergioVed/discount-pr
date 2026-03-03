import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { EntityNotFoundError } from 'src/core/errors/cases/application/shared/EntityNotFoundError';
import { CreateUserDtoRepository } from 'src/core/repository/UserRepository/dto/CreateUserDtoRepository';
import type { IUserRepository } from 'src/core/repository/UserRepository/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async getAllUsers () {
    return await this.userRepository.getAll()
  }

  async createUser (dto: CreateUserDtoRepository) {
    return await this.userRepository.create({...dto, role: "MANAGER"})
  }

  async findUserByEmail (email: string) {
    return await this.userRepository.findUserByEmail(email)
  }

  async activateUser (id: number) {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new EntityNotFoundError("User", id)
    }
    user.activate()
    return this.userRepository.update(user)
  }

}