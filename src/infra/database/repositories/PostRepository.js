import Base from "./Base.js";
import Post from "../domain/entities/Post.js";

class PostRepository extends Base {
  constructor() {
    super(Post);
  }
}

export default new PostRepository();
