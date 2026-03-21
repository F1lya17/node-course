import { inject, injectable } from "inversify";
import type { UserLoginDto } from "./dto/user-login.dto.js";
import type { UserRegisterDto } from "./dto/user-register.dto.js";
import { UserEntity } from "./user.entity.js";
import { FILE_TYPES } from "../file-types.js";
import type { IConfigService } from "../config/config-servive.interface.js";
import type { IUserRepository } from "./users-repository.interface.js";
import type { UserModel } from "../generated/prisma/index.js";

@injectable()
export class UsersService {
  constructor(
    @inject(FILE_TYPES.IConfigService) private configService: IConfigService,
    @inject(FILE_TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser(dto: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new UserEntity(dto.email, dto.name);
    await newUser.setPassword(dto.password, Number(this.configService.get("SALT")));
    const isExistedUser = await this.userRepository.find(dto.email);
    if (!isExistedUser) {
      return this.userRepository.create(newUser);
    }

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    const existedUser = await this.userRepository.find(dto.email);
    if (!existedUser) {
      return false;
    }
    const user = new UserEntity(existedUser.email, existedUser.name, existedUser.password);
    return user.comparePassword(dto.password);
  }
}
