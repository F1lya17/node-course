import { inject, injectable } from "inversify";
import type { UserLoginDto } from "./dto/user-login.dto.js";
import type { UserRegisterDto } from "./dto/user-register.dto.js";
import { UserEntity } from "./user.entity.js";
import { FILE_TYPES } from "../file-types.js";
import type { IConfigService } from "../config/config-servive.interface.js";

@injectable()
export class UsersService {
  constructor(@inject(FILE_TYPES.IConfigService) private configService: IConfigService) {}

  async createUser(dto: UserRegisterDto): Promise<UserEntity | null> {
    const newUser = new UserEntity(dto.email, dto.name);
    await newUser.setPassword(dto.password, Number(this.configService.get("SALT")));

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
