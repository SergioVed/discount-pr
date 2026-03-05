import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
