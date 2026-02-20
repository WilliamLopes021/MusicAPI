import userService from "../services/userService.js";

const userController = {
  async create(req, res, next) {
    try {
      const response = await userService.create(req.body);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const response = await userService.update(req.user.id, req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  async show(req, res, next) {
    try {
      const response = await userService.show(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  async destroy(req, res, next) {
    try {
      const response = await userService.destroy(req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  async changeEmail(req, res, next) {
    try {
      const { email } = req.body;
      const response = await userService.changeEmail(email, req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },

  async confirmEmailChange(req, res, next) {
    try {
      const { code } = req.body;
      const response = await userService.confirmEmailChange(code, req.user.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default userController;
