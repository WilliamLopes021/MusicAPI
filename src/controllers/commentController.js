import commentService from "../services/commentService.js";

const commentController = {
  async create(req, res, next) {
    try {
      const response = await commentService.create(
        req?.user.id,
        req.params.id,
        req.body,
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await commentService.update(
        req.user.id,
        req.params,
        req.body,
      );

      return res.status(200).json(updated);
    } catch (e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const updated = await commentService.destroy(req.user.id, req.params);

      return res.status(200).json(updated);
    } catch (e) {
      next(e);
    }
  },
};

export default commentController;
