import { UniqueEntityId, RefreshTokenFormat } from "../../value-objects";

export type ArticleProps = {
  readonly authorId: UniqueEntityId;
  _title: string;
  _content: string;
  available: boolean;
};
