import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/infrastructure/db/entities/UserModel';
import { UsersController } from '../controllers/UserController';
import { UserService } from 'src/core/services/UserService/UserService';
import { UserRepositoryImpl } from 'src/infrastructure/db/repository/UserRepositoryImpl';
import { UserMapper } from 'src/infrastructure/db/mappers/UserMapper';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UserService, UserMapper, {
    provide: 'IUserRepository',
    useClass: UserRepositoryImpl
  }],
  exports: [UserService]
})
export class UsersModule {}