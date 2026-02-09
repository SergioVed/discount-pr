import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/core/repository/UserRepository/dto/CreateUserDto';
import type { IUserRepository } from 'src/core/repository/UserRepository/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async getAllUsers () {
    return await this.userRepository.getAllUsers()
  }

  async createUser (dto: CreateUserDto) {
    return await this.userRepository.createUser(dto)
  }

  async findUserByEmail (email: string) {
    return await this.userRepository.findUserByEmail(email)
  }
}