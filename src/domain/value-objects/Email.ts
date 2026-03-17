export class Email {
  constructor(private readonly value: string) {}

  static createEmail(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Endereço de E-mail inválido.");
    }

    return new Email(email);
  }

  getValue(): string {
    return this.value;
  }
}
