export class Password {
  constructor(private readonly password: string) {}

  static createPassword(pass: string): Password {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (pass.length < 8) {
      throw new Error("O tamanho mínimo da senha é de 8 caracteres.");
    }

    if (!passwordRegex.test(pass)) {
      throw new Error("Senha inválida.");
    }

    return new Password(pass);
  }

  getValue(): string {
    return this.password
  }
}
