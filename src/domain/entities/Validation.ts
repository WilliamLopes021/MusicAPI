import { TokenTypes } from "../types";
import { UniqueEntityId } from "../value-objects";
import { ValidationProps } from "../types/props/ValidationProps";

export class Validation {
  constructor(
    private props: ValidationProps,
    private readonly _id?: UniqueEntityId,
  ) {}

  get code(): number {
    return this.props._code!;
  }

  set code(value: number) {
    if(typeof value !== 'number') throw new Error("Código de validação deve ser um número.");

    if (value < 100000 || value > 999999) {
      throw new Error("Código de validação deve ser um número de 6 dígitos.");
    }

    this.props._code = value;
  }

  set expiresAt(date: Date) {
    if (date < new Date()) {
      throw new Error("Data inválida.");
    }

    this.props._expiresAt = date;
  }

  get expiresAt(): Date {
    return this.props._expiresAt;
  }
}
