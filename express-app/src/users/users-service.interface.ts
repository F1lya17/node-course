import type { UserModel } from "../generated/prisma/index.js";
import type { UserLoginDto } from "./dto/user-login.dto.js";
import type { UserRegisterDto } from "./dto/user-register.dto.js";

export interface IUsersService {
  createUser(dto: UserRegisterDto): Promise<UserModel | null>;
  validateUser(dto: UserLoginDto): Promise<boolean>;
  getInfoUser(email: string): Promise<UserModel | null>;
}
