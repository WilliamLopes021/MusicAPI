import { Router } from "express";
import { AuthController } from "../../app/controllers/auth.controller.js";
import authMiddleware from "../../app/policies/authPolicy.js";

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/login", authController.login);
  router.post("/refresh", authController.refresh);
  router.post("/code", authMiddleware, authController.activateAccount);
  router.post("/resend", authController.resend);

  return router;
}

// const router = Router();

// router.post("/login", authController.login);
// router.post("/refresh", authController.refresh);
// router.post("/code", authMiddleware, authController.activateAccount);
// router.post("/resend", authController.resend);

// export default router;
