import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { SignIn_invite } from 'src/sign-in-invites/sing-in-invite.model';
import { Token } from 'src/tokens/token.model';

@Module({
  imports: [SequelizeModule.forFeature([User, SignIn_invite, Token])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
