import { hash } from "bcryptjs";

export class UserEntity {
  private _password: string;

  constructor(
    private _email: string,
    private _name: string,
  ) {}

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string, salt?: number): Promise<void> {
    this._password = await hash(password, salt || 10);
  }
}
