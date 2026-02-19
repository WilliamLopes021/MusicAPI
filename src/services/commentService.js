import PostRepository from "../repositories/PostRepository.js";
import UserRepository from "../repositories/userRepository.js";
import CommentRepository from "../repositories/CommentRepository.js";
import AppError from "../error/AppError.js";
import validateString from "../utils/validateString.js";

const commentService = {
  async create(userId, postId, data) {
    const { body } = data;

    validateString(userId, "UserID");
    validateString(postId, "PostID");
    validateString(body, "Texto inválido.");

    const user = await UserRepository.show({ _id: userId });
    const post = await PostRepository.show({ _id: postId });

    if (!post) {
      throw new AppError("Post não encontrado.", 400);
    }

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    const comment = await CommentRepository.create({
      user: user._id,
      post: post._id,
      body: body.trim(),
    });

    return comment;
  },

  async update(userId, postId, commentId, data) {
    const { body } = data;

    validateString(userId, "UserID");
    validateString(postId, "PostID");
    validateString(commentId, "commentId");
    validateString(body, "Texto inválido.");

    const user = await UserRepository.show({ _id: userId });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    const post = await PostRepository.show({ _id: postId });
    if (!post) throw new AppError("Post não encontrado.", 404);

    const userComment = await CommentRepository.show({ _id: commentId });

    if (!userComment) {
      throw new AppError("Comentário não encontrado.", 404);
    }

    if (userComment.user.toString() !== user._id.toString()) {
      throw new AppError("Mudança não permitida.", 401);
    }

    userComment.body = body;

    await userComment.save();
    return userComment;
  },

  async destroy(userId, postId, commentId) {
    validateString(userId, "UserID");
    validateString(postId, "PostID");
    validateString(commentId, "CommentId");

    const post = await PostRepository.show({ _id: postId });
    if (!post) throw new AppError("Post não encontrado.", 404);

    const user = await UserRepository.show({ _id: userId });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    const comment = await CommentRepository.show({ _id: commentId });

    if (!comment) {
      throw new AppError("Comentário não encontrado.", 404);
    }

    if (comment.user.toString() !== user._id.toString()) {
      throw new AppError("Mudança não permitida.", 401);
    }

    comment.deleteOne();
    await comment.save();

    return { success: true };
  },
};

export default commentService;
