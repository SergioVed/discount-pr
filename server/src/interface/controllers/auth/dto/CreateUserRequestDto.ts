import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(5, 12)
  @IsNotEmpty()
  password: string;
}
