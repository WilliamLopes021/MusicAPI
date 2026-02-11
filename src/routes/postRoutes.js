import { Router } from "express";
import postController from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", postController.index);
router.get("/:id", postController.show);
router.post("/", authMiddleware, postController.create);
router.put("/:id", authMiddleware, postController.update);
router.delete("/", authMiddleware, postController.destroy);

export default router;
