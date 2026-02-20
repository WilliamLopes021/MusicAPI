import authService from "../services/authService.js";

const authController = {
  async login(req, res, next) {
    try {
      const response = await authService.login(req.body);
      res.cookie("refreshToken", response.rawToken);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async refresh(req, res, next) {
    try {
      const cookie = req.cookies;
      const response = await authService.refresh(cookie);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
  
  async activateAccount(req, res, next) {
    try {
      const response = await authService.activateAccount(req.body, req.user);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
  
  async resend(req, res, next) {
    try {
      const response = await authService.resendCode(req.body);

      if (typeof response === "string") {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default authController;
