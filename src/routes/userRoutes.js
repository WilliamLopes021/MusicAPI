import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", userController.show);
router.post("/", userController.create);
router.put("/", authMiddleware, userController.update);
router.delete("/", authMiddleware, userController.destroy);
router.patch("/email", authMiddleware, userController.changeEmail);
router.patch("/email/confirm", authMiddleware, userController.confirmEmail);

export default router;
