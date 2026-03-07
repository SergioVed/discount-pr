import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateInviteRequestDto {

    @IsEmail()
    @IsNotEmpty()
    emailTo: string;
}