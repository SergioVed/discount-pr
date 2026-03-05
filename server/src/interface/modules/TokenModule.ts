import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModel } from 'src/infrastructure/db/entities/TokenModel';
import { TokenService } from 'src/core/services/TokenService/TokenService';
import { TokenMapper } from 'src/infrastructure/db/mappers/TokenMapper';
import { TokenRepositoryImpl } from 'src/infrastructure/db/repository/TokenRepositoryImpl';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([TokenModel]), JwtModule],
  providers: [
    TokenService,
    TokenMapper,
    {
      provide: 'ITokenRepository',
      useClass: TokenRepositoryImpl,
    },
  ],
  controllers: [],
  exports: [TokenService],
})
export class TokenModule {}
