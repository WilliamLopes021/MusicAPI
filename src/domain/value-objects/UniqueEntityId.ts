export class UniqueEntityId {
  private constructor(private readonly value: string) {}

  static create(value?: string): UniqueEntityId {
    if (value) {
      if (!this.isValid(value)) {
        throw new Error('Invalid ID');
      }
      return new UniqueEntityId(value);
    }

    return new UniqueEntityId(crypto.randomUUID());
  }

  static isValid(value: string): boolean {
    return value.length > 0;
  }

  toString(): string {
    return this.value;
  }

  equals(id: UniqueEntityId): boolean {
    return this.value === id.value;
  }
}