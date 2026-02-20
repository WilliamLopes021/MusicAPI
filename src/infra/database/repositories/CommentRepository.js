import Base from "./Base.js";
import Comment from "../models/Comment.js";

class CommentRepository extends Base {
  constructor() {
    super(Comment);
  }
}

export default new CommentRepository();
