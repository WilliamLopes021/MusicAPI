import { Article } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { IArticleDocument } from "../schemas";

export class ArticleMapper {
  static toEntity(doc: IArticleDocument): Article {
    return new Article(
      UniqueEntityId.createId(doc._id.toString()),
      UniqueEntityId.createId(doc.authorId.toString()),
      doc.title,
      doc.content,
      doc.available,
    );
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
