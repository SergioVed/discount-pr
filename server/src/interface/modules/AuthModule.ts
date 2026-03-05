import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from 'src/core/services/AuthService/AuthService';
import { AuthController } from '../controllers/auth/AuthController';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from 'src/infrastructure/db/entities/TokenModel';
import { UserModel } from 'src/infrastructure/db/entities/UserModel';
import { SignInInviteModule } from './SignInInviteModule';
import { TokenModule } from './TokenModule';
import { UsersModule } from './UserModule';
import { InviteValidator } from 'src/helpers/signInInvite/validateInvite';

@Module({
  imports: [
    SequelizeModule.forFeature([TokenModel, UserModel]),
    TokenModule,
    SignInInviteModule,
    UsersModule,
  ],
  providers: [AuthService, JwtService, InviteValidator],
  controllers: [AuthController],
})
export class AuthModule {}
