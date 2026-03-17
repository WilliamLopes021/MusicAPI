export class RefreshTokenFormat {
  constructor(private readonly value: string) {}

  static create(token: string) {
    if (typeof token !== "string") throw new Error("Formato de dado inválido.");

    if (token.trim() === "" || token.length < 20) {
      throw new Error("Token inválido.");
    }

    return new RefreshTokenFormat(token);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: RefreshTokenFormat): boolean {
    return this.value === other.value;
  }
}
