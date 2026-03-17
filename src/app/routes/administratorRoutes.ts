import { Router } from "express";
import { AdministratorController } from "../controllers";
import { authMiddleware, adminAuthMiddleware } from "../middlewares";
import { validateObjectId } from "../middlewares/validate";

const router = Router();
const controller = new AdministratorController();

router.post("/", authMiddleware, adminAuthMiddleware, controller.create.bind(controller));
router.get("/user/:userId", validateObjectId("userId"), adminAuthMiddleware, controller.findByUserId.bind(controller));
router.delete("/:id", validateObjectId("id"), authMiddleware, adminAuthMiddleware, controller.delete.bind(controller));

export default router;
