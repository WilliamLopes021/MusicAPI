import { Comment } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { ICommentDocument } from "../schemas";

export class CommentMapper {
  static toEntity(doc: ICommentDocument): Comment {
    return new Comment({
      _content: doc.content,
      articleId: UniqueEntityId.create(doc.articleId.toString()),
      authorId: UniqueEntityId.create(doc.authorId.toString()),
    }
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
