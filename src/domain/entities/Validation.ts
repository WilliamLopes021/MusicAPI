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
    if (typeof value !== "number")
      throw new Error("Código de validação deve ser um número.");

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

  get userId(): UniqueEntityId {
    return this.props.userId!;
  }

  get type(): TokenTypes {
    return this.props.type;
  }

  get used(): boolean {
    return this.props.used;
  }

  static generateCode(): number{
    const numberCode = Math.floor(Math.random() * 900000) + 100000 
    return numberCode;
  }
}
