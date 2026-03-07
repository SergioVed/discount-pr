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
import { TokenHelper } from 'src/helpers/token/tokenHelper';

@Module({
  imports: [
    SequelizeModule.forFeature([TokenModel, UserModel]),
    TokenModule,
    SignInInviteModule,
    UsersModule,
  ],
  providers: [AuthService, JwtService, TokenHelper],
  controllers: [AuthController],
})
export class AuthModule {}
