import { UniqueEntityId } from "../value-objects";

export class Comment {
  constructor(
    public readonly id: UniqueEntityId,
    private _content: string,
    public articleId: UniqueEntityId,
    public authorId: UniqueEntityId,
  ) {}

  set content(value: string){
    if(value.trim() === ''){
      throw new Error('O conteúdo do comentário não pode estar vazio.')
    }
  }

  get content(): string{
    return this._content;
  }
}
