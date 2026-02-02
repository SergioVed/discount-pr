import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/tokens/token.model';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { InviteLinkPipe } from 'src/pipes/invitePipe';
import { SignInInvitesModule } from 'src/sign-in-invites/sign-in-invites.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Token, User]),
    UsersModule,
    TokensModule,
    SignInInvitesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, InviteLinkPipe]
})
export class AuthModule {}
