import { inject, injectable } from "inversify";
import { FILE_TYPES } from "../file-types.js";
import type { PrismaService } from "../database/prisma-service.js";
import type { UserEntity } from "./user.entity.js";
import type { UserModel } from "../generated/prisma/index.js";

@injectable()
export class UserRepository {
  constructor(@inject(FILE_TYPES.PrismaService) private prismaService: PrismaService) {}

  create({ name, email, password }: UserEntity): Promise<UserModel> {
    return this.prismaService.client.userModel.create({ data: { name, email, password } });
  }

  find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({ where: { email } });
  }
}
