import authService from "../services/authService.js";

const authController = {
  async login(req, res, next) {
    try {
      const response = await authService.login(req.body);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
  async refresh(req, res, next) {
    try {
      // const response = await authService.refresh(cookie);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default authController;
