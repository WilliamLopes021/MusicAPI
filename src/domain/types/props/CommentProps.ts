import { UniqueEntityId, RefreshTokenFormat } from "../../value-objects";

export type CommentProps = {
  _content: string;
  articleId: UniqueEntityId;
  authorId: UniqueEntityId;
};
