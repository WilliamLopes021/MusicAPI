import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", userController.create);
router.get("/", authMiddleware, userController.show);
router.put("/", authMiddleware, userController.update);
router.delete("/", authMiddleware, userController.destroy);

// Autenticação/E-mail
router.post("/code", authMiddleware, userController.validateCode);
router.post("/resend", userController.resendCode);

export default router;
