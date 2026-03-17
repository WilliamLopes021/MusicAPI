import { CommentProps } from "../types/props/CommentProps";
import { UniqueEntityId } from "../value-objects";

export class Comment {
  constructor(
    private props: CommentProps,
    public readonly id?: UniqueEntityId,
  ) {}

  set content(value: string){
    if(value.trim() === ''){
      throw new Error('O conteúdo do comentário não pode estar vazio.')
    }
  }

  get content(): string{
    return this.props._content;
  }
}
