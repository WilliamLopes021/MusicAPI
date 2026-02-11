import PostRepository from "../repositories/PostRepository.js";
import UserRepository from "../repositories/userRepository.js";
import AppError from "../error/AppError.js";
import validateString from "../utils/validateString.js";

const commentService = {
  async create(userId, postId, data) {
    const { body } = data;

    validateString(userId, "UserID");
    validateString(postId, "PostID");
    validateString(body, "Texto inválido.");

    const user = await UserRepository.show({ _id: userId });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    const updatedPost = await PostRepository.createComment(
      postId,
      user.photoUrl,
      user.name,
      body,
    );

    return updatedPost;
  },
};

export default commentService;
