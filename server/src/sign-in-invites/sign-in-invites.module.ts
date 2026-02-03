import { Module } from '@nestjs/common';
import { SignInInvitesController } from './sign-in-invites.controller';
import { SignInInvitesService } from './sign-in-invites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SignIn_invite } from './sing-in-invite.model';
import { User } from 'src/users/user.model';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    SequelizeModule.forFeature([SignIn_invite, User]),
    JwtModule,
    TokensModule
  ],
  controllers: [SignInInvitesController],
  providers: [SignInInvitesService],
  exports: [SignInInvitesService]
})
export class SignInInvitesModule {}
