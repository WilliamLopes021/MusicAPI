import AppError from "../error/AppError.js";
import PostRepository from "../repositories/PostRepository.js";
import userRepository from "../repositories/userRepository.js";
import postValidator from "../utils/postValidator.js";

const postService = {
  async create(userId, data) {
    const id = userId;
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    console.log(data);
    for (let entries of Object.entries(data)) {
      const [key, value] = entries;
      const fn = postValidator[key];
      if (!fn(value)) {
        console.log(key, value);
        throw new AppError(`Campo ${key} inválido.`, 400);
      }
    }

    const user = await userRepository.show({ _id: id });
    if (!user || !user.isActive)
      throw new AppError("Usuário não encontrado.", 404);

    const createdPost = await PostRepository.create({ ...data, creator: id });
    await createdPost.populate({
      path: "creator",
      select: "_id name photoUrl",
    });

    return createdPost;
  },

  async destroy(id, userId) {
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    const post = await PostRepository.show({ _id: id });

    if (!post) throw new AppError("Postagem não encontrada.", 404);

    const user = await userRepository.show({ _id: userId });
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    if (post.creator._id !== user._id) {
      throw new AppError("Permissão negada.", 401);
    }

    await post.deleteOne();
    return { success: true };
  },

  async update(id, data, userId) {
    for (let value of [userId, id])
      if (!value || typeof value !== "string") {
        throw new AppError("ID inválido.", 400);
      }

    const post = await PostRepository.show({ _id: id });

    if (!post) throw new AppError("Postagem não encontrada.", 404);

    if (post.creatorId !== userId) {
      throw new AppError("Permissão negada.", 401);
    }

    for (let value of Object.entries(data)) {
      const [key, val] = value;
      const fn = postValidator[key];
      if (!fn(val)) throw new AppError(`Dado inválido no campo ${key}`, 400);
    }

    post.set();

    await post.save();
    return post;
  },

  async show(id) {
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    const post = await PostRepository.show({ _id: id });
    if (!post) throw new AppError("Postagem não encontrada.", 404);

    return post;
  },

  async index() {
    const allPosts = await PostRepository.index();
    if (allPosts.length === 0) {
      return { message: "Nenhuma postagem foi feita até o momento." };
    }

    return allPosts;
  },
};

export default postService;
