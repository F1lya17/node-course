import { config, type DotenvConfigOutput, type DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { FILE_TYPES } from "../file-types.js";
import type { ILoggerService } from "../logger/logger.service.js";
import type { IConfigService } from "./config-servive.interface.js";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(FILE_TYPES.ILogger) private loggerService: ILoggerService) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error(`Config error: ${result.error.message}`);
    } else {
      this.loggerService.log("Config is loaded");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string | undefined {
    if (!this.config) {
      this.loggerService.error("Config is not loaded");
      return undefined;
    }

    return this.config[key];
  }
}
