import { Router } from "express";
import { ArticleController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { validateObjectId } from "../middlewares/validate";

const router = Router();
const controller = new ArticleController();

router.get("/", controller.findAll.bind(controller));
router.get("/:id", validateObjectId("id"), controller.findById.bind(controller));
router.post("/", authMiddleware, controller.create.bind(controller));
router.put("/:id", validateObjectId("id"), authMiddleware, controller.update.bind(controller));
router.delete("/:id", validateObjectId("id"), authMiddleware, controller.delete.bind(controller));

export default router;
