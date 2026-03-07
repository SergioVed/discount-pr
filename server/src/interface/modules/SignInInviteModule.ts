import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SignInInviteModel } from 'src/infrastructure/db/entities/SignInInviteModel';
import { SignInInviteService } from 'src/core/services/SignInInviteService/SignInInviteService';
import { SignInInviteMapper } from 'src/infrastructure/db/mappers/SignInInviteMapper';
import { SignInInviteRepositoryImpl } from 'src/infrastructure/db/repository/SignInInviteRepositoryImpl';
import { SignInInviteController } from '../controllers/invites/SignInInviteController';
import { TokenModule } from './TokenModule';
import { TokenHelper } from 'src/helpers/token/tokenHelper';

@Module({
  imports: [SequelizeModule.forFeature([SignInInviteModel]), TokenModule],
  providers: [
    SignInInviteMapper,
    SignInInviteService,
    TokenHelper,
    {
      provide: 'ISignInInviteRepository',
      useClass: SignInInviteRepositoryImpl,
    },
  ],
  controllers: [SignInInviteController],
  exports: [SignInInviteService, 'ISignInInviteRepository'],
})
export class SignInInviteModule {}
