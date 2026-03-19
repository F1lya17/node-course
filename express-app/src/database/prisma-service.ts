import { PrismaClient } from "../generated/prisma/index.js";
import { inject, injectable } from "inversify";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { FILE_TYPES } from "../file-types.js";
import type { ILoggerService } from "../logger/logger.service.js";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(FILE_TYPES.ILogger) private loggerService: ILoggerService) {
    const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
    this.client = new PrismaClient({ adapter });
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.loggerService.log("[PrismaService] Успешно подключились к БД");
    } catch (e) {
      if (e instanceof Error) {
        this.loggerService.error(`[PrismaService] Ошибка подключения к БД: ${e.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
