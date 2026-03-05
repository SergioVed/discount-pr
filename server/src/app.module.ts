import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infrastructure/db/entities/UserModel';
import { UsersModule } from './interface/modules/UserModule';
import { RestaurantModule } from './interface/modules/RestaurantModule';
import { RestaurantModel } from './infrastructure/db/entities/RestaurantModel';
import { TokenModule } from './interface/modules/TokenModule';
import { AuthModule } from './interface/modules/AuthModule';
import { SignInInviteModule } from './interface/modules/SignInInviteModule';
import { SpecialOfferModule } from './interface/modules/SpecialOfferModule';
import { ClaimRequestModule } from './interface/modules/ClaimRequestModule';
import { SpecialOfferModel } from './infrastructure/db/entities/SpecialOfferModel';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}.local` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [UserModel, RestaurantModel, SpecialOfferModel],
      synchronize: true,
      autoLoadModels: true,
    }),
    TokenModule,
    UsersModule,
    RestaurantModule,
    AuthModule,
    SignInInviteModule,
    SpecialOfferModule,
    ClaimRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
