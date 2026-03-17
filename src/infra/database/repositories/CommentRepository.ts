import { CommentModel } from "../models";
import { Comment } from "../../../domain/entities";
import { CommentMapper } from "../mappers";
import { ICommentRepository } from "../../../domain/repositories";

export class CommentRepository implements ICommentRepository {
  async save(data: Comment): Promise<Comment> {
    const document = CommentMapper.toDocument(data);

    const doc = await CommentModel.findByIdAndUpdate(
      data.id.getValue(),
      document,
      { new: true, upsert: true }
    );

    return CommentMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await CommentModel.findByIdAndDelete(id);
  }

  async findByPostId(postId: string): Promise<Array<Comment> | null> {
    const docs = await CommentModel.find({ articleId: postId });
    if (!docs.length) return null;

    return docs.map((document) => CommentMapper.toEntity(document));
  }

  async findById(id: string): Promise<Comment | null> {
    const doc = await CommentModel.findById(id);
    if (!doc) return null;

    return CommentMapper.toEntity(doc);
  }
}
