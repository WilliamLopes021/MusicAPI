import { Comment } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { ICommentDocument } from "../schemas";

export class CommentMapper {
  static toEntity(doc: ICommentDocument): Comment {
    return new Comment(
      UniqueEntityId.createId(doc._id.toString()),
      doc.content,
      UniqueEntityId.createId(doc.articleId.toString()),
      UniqueEntityId.createId(doc.authorId.toString()),
    );
  }

  static toDocument(entity: Comment) {
    return {
      content: entity.content,
      articleId: entity.articleId.toString(),
      authorId: entity.authorId.toString(),
    };
  }
}
