import { TokenTypes } from "../types";
import { UniqueEntityId } from "../value-objects";

export class Validation {
  constructor(
    public readonly id: UniqueEntityId,
    public readonly userId: UniqueEntityId,
    public readonly type: TokenTypes,
    private _expiresAt: Date,
    public used: boolean = false,
    private _code?: number,
  ) {}

  get code(): number {
    return this._code!;
  }

  set code(value: number) {
    if(typeof value !== 'number') throw new Error("Código de validação deve ser um número.");

    if (value < 100000 || value > 999999) {
      throw new Error("Código de validação deve ser um número de 6 dígitos.");
    }

    this._code = value;
  }

  set expiresAt(date: Date) {
    if (date < new Date()) {
      throw new Error("Data inválida.");
    }

    this._expiresAt = date;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }
}
