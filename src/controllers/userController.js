import userService from "../services/userService.js";

const userController = {
  async create(req, res) {
    try {
      const response = await userService.create(req.body);

      res.status(200).json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async update(req, res) {
    try {
      const response = await userService.update(req.user.id, req.body);

      res.json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async show(req, res) {
    try {
      const response = await userService.show(req.params.id);
      res.json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async destroy(req, res) {
    try {
      const response = await userService.destroy(req.user.id);

      res.json(response);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async changeEmail(req, res) {
    try {
      const { email } = req.body;

      const response = await userService.changeEmail(email, req.user.id);

      res.json(response);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async confirmEmail(req, res) {
    try {
      const { code } = req.body;
      const response = await userService.confirmEmail(code, req.user.id);
      res.json(response);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default userController;
