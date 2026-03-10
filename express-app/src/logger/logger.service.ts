import { injectable } from "inversify";
import { Logger } from "tslog";
import "reflect-metadata";

export interface ILoggerService {
  log(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
}

injectable();
export class LoggerService implements ILoggerService {
  private logger: Logger<unknown>;

  constructor() {
    this.logger = new Logger({
      hideLogPositionForProduction: true,
      type: "pretty",
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
