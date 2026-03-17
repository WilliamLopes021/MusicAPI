import { Router } from "express";
import { CommentController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { validateObjectId } from "../middlewares/validate";

const router = Router();
const controller = new CommentController();

router.get("/article/:articleId", validateObjectId("articleId"), controller.findByArticle.bind(controller));
router.get("/:id", validateObjectId("id"), controller.findById.bind(controller));
router.post("/article/:articleId", validateObjectId("articleId"), authMiddleware, controller.create.bind(controller));
router.put("/:id", validateObjectId("id"), authMiddleware, controller.update.bind(controller));
router.delete("/:id", validateObjectId("id"), authMiddleware, controller.delete.bind(controller));

export default router;
