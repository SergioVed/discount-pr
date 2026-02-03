import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { User } from './users/user.model';
import { Restaurant } from './restaurants/restaurant.model';
import { SpecialOffersModule } from './special-offers/special-offers.module';
import { Special_offer } from './special-offers/special-offer.model';
import { SignInInvitesModule } from './sign-in-invites/sign-in-invites.module';
import { SignIn_invite } from './sign-in-invites/sing-in-invite.model';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { Token } from './tokens/token.model';
import { ClaimRestaurantModule } from './claim-restaurant/claim-restaurant.module';
import { Claim_request } from './claim-restaurant/claim-restaurant.model';
import { GoogleModule } from './google/google.module';

@Module({
   imports: [
    ConfigModule.forRoot({envFilePath: `.env.${process.env.NODE_ENV}.local`}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Restaurant, Special_offer, SignIn_invite, Token, Claim_request],
      synchronize: true,
      autoLoadModels: true
    }),
    UsersModule,
    RestaurantsModule,
    SpecialOffersModule,
    SignInInvitesModule,
    TokensModule,
    AuthModule,
    ClaimRestaurantModule,
    GoogleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
