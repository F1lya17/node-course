import { injectable } from "inversify";
import type { UserLoginDto } from "./dto/user-login.dto.js";
import type { UserRegisterDto } from "./dto/user-register.dto.js";
import { UserEntity } from "./user.entity.js";

@injectable()
export class UsersService {
  async createUser(dto: UserRegisterDto): Promise<UserEntity | null> {
    const newUser = new UserEntity(dto.email, dto.name);
    await newUser.setPassword(dto.password);

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
