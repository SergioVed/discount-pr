import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
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