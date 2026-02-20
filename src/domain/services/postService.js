import AppError from "../errors/AppError.js";
import PostRepository from "../repositories/PostRepository.js";
import userRepository from "../repositories/userRepository.js";
import postValidator from "../../utils/postValidator.js";

const postService = {
  async create(userId, data) {
    const id = userId;
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    for (let entries of Object.entries(data)) {
      const [key, value] = entries;
      const fn = postValidator[key];
      if (!fn(value)) {
        throw new AppError(`Campo ${key} inválido.`, 400);
      }
    }

    const { flags, title, description } = data;

    const user = await userRepository.show({ _id: id });
    if (!user || !user.isActive)
      throw new AppError("Usuário não encontrado.", 404);

    const createdPost = await PostRepository.create({
      creator: id,
      title: title.trim(),
      description: description.trim(),
      flags: flags.trim().split(" "),
    });
    
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

    if (post.creator.toString() !== user._id.toString()) {
      throw new AppError("Permissão negada.", 401);
    }

    await post.deleteOne();
    return { success: true };
  },

  async update(id, userId, data) {
    for (let value of [userId, id])
      if (!value || typeof value !== "string") {
        console.log(value);
        throw new AppError("ID inválido.", 400);
      }

    const post = await PostRepository.show({ _id: id });

    if (!post) throw new AppError("Postagem não encontrada.", 404);

    if (post.creator.toString() !== userId) {
      throw new AppError("Permissão negada.", 401);
    }

    for (let value of Object.entries(data)) {
      const [key, val] = value;
      const fn = postValidator[key];
      if (!fn(val)) throw new AppError(`Dado inválido no campo ${key}`, 400);
    }

    post.set({ ...data });

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
