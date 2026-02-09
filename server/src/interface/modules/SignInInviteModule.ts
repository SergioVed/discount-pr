import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TokenModel } from "src/infrastructure/db/entities/TokenModel";
import { TokenService } from "src/core/services/TokenService/TokenService";
import { TokenMapper } from "src/infrastructure/db/mappers/TokenMapper";
import { TokenRepositoryImpl } from "src/infrastructure/db/repository/TokenRepositoryImpl";
import { JwtModule } from "@nestjs/jwt";
import { SignInInviteModel } from "src/infrastructure/db/entities/SignInInviteModel";
import { SignInInviteService } from "src/core/services/SignInInviteService/SignInInviteService";
import { SignInInviteMapper } from "src/infrastructure/db/mappers/SignInInviteMapper";
import { SignInInviteRepositoryImpl } from "src/infrastructure/db/repository/SignInInviteRepositoryImpl";
import { SignInInviteController } from "../controllers/SignInInviteController";


@Module({
    imports: [SequelizeModule.forFeature([SignInInviteModel])],
    providers: [SignInInviteMapper, SignInInviteService, {
        provide: 'ISignInInviteRepository',
        useClass: SignInInviteRepositoryImpl
    }],
    controllers: [SignInInviteController],
    exports: [SignInInviteService]
})

export class SignInInviteModule {}