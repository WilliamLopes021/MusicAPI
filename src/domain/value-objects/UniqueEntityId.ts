export class UniqueEntityId {
  constructor(private readonly id: string) {}

  static createId(id: string): UniqueEntityId {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("ID inválido.");
    }

    return new UniqueEntityId(id);
  }

  getValue(): string {
    return this.id;
  }
}
