import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthService } from "src/core/services/AuthService/AuthService";
import { AuthController } from "../controllers/AuthController";
import { TokenRepositoryImpl } from "src/infrastructure/db/repository/TokenRepositoryImpl";
import { JwtService } from "@nestjs/jwt";
import { UserRepositoryImpl } from "src/infrastructure/db/repository/UserRepositoryImpl";
import { TokenModel } from "src/infrastructure/db/entities/TokenModel";
import { UserModel } from "src/infrastructure/db/entities/UserModel";
import { SignInInviteRepositoryImpl } from "src/infrastructure/db/repository/SignInInviteRepositoryImpl";
import { SignInInviteModule } from "./SignInInviteModule";
import { TokenModule } from "./TokenModule";
import { UsersModule } from "./UserModule";


@Module({
    imports: [SequelizeModule.forFeature([TokenModel, UserModel]), TokenModule, SignInInviteModule, UsersModule],
    providers: [AuthService, JwtService],
    controllers: [AuthController]
})

export class AuthModule { }