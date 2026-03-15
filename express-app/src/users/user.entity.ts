import { hash } from "bcryptjs";

export class UserEntity {
  private _password: string;

  constructor(
    private _login: string,
    private _name: string,
  ) {}

  get login(): string {
    return this._login;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string): Promise<void> {
    this._password = await hash(password, 10);
  }
}
