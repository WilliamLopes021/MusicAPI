import { Email, Password, UniqueEntityId } from "../value-objects";

export class User {
  constructor(
    public readonly id: UniqueEntityId,
    private _name: string,
    private _email: Email,
    private _password: Password,
    private _description: string,
    private activated: boolean = false,
  ) {}

  activateAccount(): void{
    if(this.activated) throw new Error('Conta já ativada.');
    this.activated = true;
  }

  inertAccount(): void{
    if(!this.activated) throw new Error('Conta já desativada.');
    this.activated = false;
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password.getValue();
  }

  get email(): Email {
    return this._email;
  }

  get description(): string {
    return this._description;
  }

  // Setters
  set name(newName: string) {
    if (newName.length < 3) {
      throw new Error("O Mínimo para um nome é de 3 caracteres.");
    }

    if (newName.trim() === "") {
      throw new Error("Nome não pode estar vazio.");
    }

    this._name = newName;
  }

  set password(newPass: string) {
    this._password = Password.createPassword(newPass);
  }

  set email(newEmail: string) {
    this._email = Email.createEmail(newEmail);
  }

  set description(desc: string) {
    if (typeof desc !== "string") throw new Error("Tipo de dado inválido");
    if (desc.length > 500)
      throw new Error("O máximo permitido são 500 caracteres.");

    this._description = desc;
  }
}
