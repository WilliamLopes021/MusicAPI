import Base from "./Base.js";
import Post from "../models/Post.js";

class PostRepository extends Base {
  constructor() {
    super(Post);
  }

  async createComment(id, userId) {
    const post = await Post.findById(id);

    post.findOne({})
    return post;
  }

  async updateComment(id, commentId, dataObj) {
    const post = await Post.findById(id);
    if (!post) return null;

    const comment = post.comments.id(commentId);

    for (let entries of Object.entries(dataObj)) {
      const [key, value] = entries;
      comment[key] = value;
    }

    await post.save();
    return post;
  }
}

export default new PostRepository();
