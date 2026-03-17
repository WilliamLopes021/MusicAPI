import { ArticleProps } from "../types/props/ArticleProps";
import { UniqueEntityId } from "../value-objects";

export class Article {
  constructor(
    private props: ArticleProps,
    public readonly _id?: UniqueEntityId,
  ) {}

  //Getters
  get content(): string {
    return this.props._content;
  }

  get title(): string {
    return this.props._title;
  }

  get available(): boolean {
    return this.props.available;
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId;
  } 
  //Setters

  set content (value: string) {
    if (value.trim() === "" || value.length < 3) {
      throw new Error("O conteúdo de comentário inválido.");
    }

    this.props._content = value;
  }

  set title(value: string) {
    if (value.trim() === "" || value.length < 3) {
      throw new Error("O conteúdo de comentário inválido.");
    }

    this.props._title = value;
  }

  setUnavailable = () => (this.props.available = false);
  setAvailable = () => (this.props.available = true);
}
