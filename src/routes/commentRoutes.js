import { Router } from "express";
import commentController from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:postId", authMiddleware, commentController.create);
router.put("/:postId/comment/:commentId", authMiddleware, commentController.update);
router.delete("/:postId/comment/:commentId", authMiddleware, commentController.update);

export default router;
