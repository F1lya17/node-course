import { injectable } from "inversify";
import { Logger } from "tslog";

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

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
