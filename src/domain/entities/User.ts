import { UserProps } from "../types/props/UserProps";
import { UniqueEntityId, Email, Password } from "../value-objects";

export class User {
  constructor(
    private props: UserProps,
    public readonly _id?: UniqueEntityId,

  ) {}

  activateAccount(): void{
    if(this.activated) throw new Error('Conta já ativada.');
    this.props._activated = true;
  }

  inertAccount(): void{
    if(!this.props._activated) throw new Error('Conta já desativada.');
    this.props._activated = false;
  }

  // Getters
  get name(): string {
    return this.props._name;
  }

  get password(): string {
    return this.props._password.getValue();
  }

  get email(): Email {
    return this.props._email;
  }

  get description(): string {
    return this.props._description;
  }

  get activated(): boolean{
    return this.props._activated;
  }

  // Setters
  set name(newName: string) {
    if (newName.length < 3) {
      throw new Error("O Mínimo para um nome é de 3 caracteres.");
    }

    if (newName.trim() === "") {
      throw new Error("Nome não pode estar vazio.");
    }

    this.props._name = newName;
  }

  set password(newPass: string) {
    this.props._password = Password.createPassword(newPass);
  }

  set email(newEmail: string) {
    this.props._email = Email.createEmail(newEmail);
  }

  set description(desc: string) {
    if (typeof desc !== "string") throw new Error("Tipo de dado inválido");
    if (desc.length > 500)
      throw new Error("O máximo permitido são 500 caracteres.");

    this.props._description = desc;
  }
}
