import { Logger } from "tslog";

export interface ILoggerService {
  log(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
}

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
