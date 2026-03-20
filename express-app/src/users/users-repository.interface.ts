import type { UserModel } from "../generated/prisma/index.js";
import type { UserEntity } from "./user.entity.js";

export interface IUserRepository {
  create: (user: UserEntity) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
