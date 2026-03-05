import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/infrastructure/db/entities/UserModel';
import { UsersController } from '../controllers/UserController';
import { UserService } from 'src/core/services/UserService/UserService';
import { UserRepositoryImpl } from 'src/infrastructure/db/repository/UserRepositoryImpl';
import { UserMapper } from 'src/infrastructure/db/mappers/UserMapper';
import { TokenModule } from './TokenModule';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), TokenModule],
  controllers: [UsersController],
  providers: [
    UserService,
    UserMapper,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserService, 'IUserRepository'],
})
export class UsersModule {}
