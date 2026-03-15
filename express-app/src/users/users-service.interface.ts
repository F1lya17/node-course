import type { UserLoginDto } from "./dto/user-login.dto.js";
import type { UserRegisterDto } from "./dto/user-register.dto.js";
import type { UserEntity } from "./user.entity.js";

export interface IUsersService {
  createUser(dto: UserRegisterDto): Promise<UserEntity | null>;
  validateUser(dto: UserLoginDto): Promise<boolean>;
}
