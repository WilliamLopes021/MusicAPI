import commentService from "../services/commentService.js";

const commentController = {
  async create(req, res) {
    try {
      const response = await commentService.create(
        req?.user.id,
        req.params.id,
        req.body,
      );
      res.status(200).json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await commentService.update(
        req.user.id,
        req.params,
        req.body,
      );

      return res.status(200).json(updated);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },
  async destroy(req, res) {},
};

export default commentController;
