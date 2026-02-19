import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/code", authMiddleware, authController.activateAccount);
router.post("/resend", authController.resend);

export default router;
