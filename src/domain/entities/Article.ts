import { UniqueEntityId } from "../value-objects";

export class Article {
  constructor(
    public readonly id: UniqueEntityId,
    public readonly authorId: UniqueEntityId,
    private _title: string,
    private _content: string,
    public available: boolean = true,
  ) {}

  set content(value: string) {
    if (value.trim() === "" || value.length < 3) {
      throw new Error("O conteúdo de comentário inválido.");
    }

    this._content = value;
  }

  get content(): string {
    return this._content;
  }

  set title(value: string) {
    if (value.trim() === "" || value.length < 3) {
      throw new Error("O conteúdo de comentário inválido.");
    }

    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  setUnavailable = () => (this.available = false);
  setAvailable = () => (this.available = true);
}
