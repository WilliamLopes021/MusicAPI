import postService from "../../services/postService.js";

const postController = {
  async create(req, res, next) {
    try {
      const response = await postService.create(req.user.id, req.body);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const deletedPost = await postService.destroy(
        req.params.id,
        req?.user.id,
      );
      return res.json(deletedPost);
    } catch (e) {
      next(e);
    }
  },

  async show(req, res, next) {
    try {
      const post = await postService.show(req.params.id);
      res.json(post);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const updatedPost = await postService.update(
        req.params.id,
        req?.user.id,
        req.body,
      );
      return res.json(updatedPost);
    } catch (e) {
      next(e);
    }
  },

  async index(req, res, next) {
    try {
      const allPosts = await postService.index();
      if (allPosts?.message) return res.status(200).json(allPosts.message);

      res.json(allPosts);
    } catch (e) {
      next(e);
    }
  },
};

export default postController;
