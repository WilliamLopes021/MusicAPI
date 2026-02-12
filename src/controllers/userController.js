import userService from "../services/userService.js";

const userController = {
  async create(req, res) {
    try {
      const response = await userService.create(req.body);

      if (response.length > 0) {
        res.status(400).json(response);
      }

      res.status(200).json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async validateCode(req, res) {
    try {
      const response = await userService.validateCode(req.body, req.user);

      if (response.length > 0) {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async update(req, res) {
    try {
      const response = await userService.update(req.user.id, req.body);

      if (response.length > 0) {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },

  async show(req, res) {
    try {
      const response = await userService.show(req.params.id);

      if (response?.length > 0) {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  },
  
  async destroy(req, res) {
    try {
      const response = await userService.destroy(req.user.id);

      if (response.length > 0) {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async resendCode(req, res) {
    try {
      const response = await userService.resendCode(req.body);

      if (typeof response === "string") {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default userController;
