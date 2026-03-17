import { Comment } from "../entities";

export interface ICommentRepository {
  save(data: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
  findByPostId(postId: string): Promise<Array<Comment> | null>;
  findById(id: string): Promise<Comment | null>;
}
