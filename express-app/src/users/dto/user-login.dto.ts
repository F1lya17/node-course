import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
  @IsEmail({}, { message: "Некорректная почта" })
  email: string;

  @IsString({ message: "Не указан пароль" })
  password: string;
}
