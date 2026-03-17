import { Article } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { IArticleDocument } from "../schemas";

export class ArticleMapper {
  static toEntity(doc: IArticleDocument): Article {
    return new Article({
      available: doc.available,
      _title: doc.title,
      _content: doc.content,
      authorId: UniqueEntityId.create(doc.authorId.toString()),
    });
  }

  static toDocument(entity: Article) {
    return {
      title: entity.title,
      content: entity.content,
      authorId: entity.authorId.toString(),
      available: entity.available,
    };
  }
}
