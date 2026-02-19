import Base from "./Base.js";
import Post from "../models/Post.js";

class PostRepository extends Base {
  constructor() {
    super(Post);
  }
}

export default new PostRepository();
