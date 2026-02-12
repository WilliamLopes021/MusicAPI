import Base from "./Base.js";
import Post from "../models/Post.js";

class PostRepository extends Base {
  constructor() {
    super(Post);
  }

  async createComment(id, userId, commentText) {
    const post = await Post.findById(id);

    post.comments.push({
      user: userId,
      body: commentText,
    });

    await post.save();

    await post.populate("comments.user", "_id name photoUrl");
    return post;
  }

  async updateComment(id, commentId, body) {
    const post = await Post.updateOne(
      { _id: id, "comments._id": commentId },
      {
        $set: {
          "comments.$.body": body,
        },
      },
    );
    return post;
  }

  async destroyComment(id, commentId) {
    const post = await Post.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
    );

    return post;
  }
}

export default new PostRepository();
