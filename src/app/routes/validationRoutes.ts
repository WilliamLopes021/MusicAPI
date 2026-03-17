import { Router } from "express";
import { ValidationController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();
const controller = new ValidationController();

router.post("/", authMiddleware, controller.create.bind(controller));
router.get("/validate/:token", controller.validate.bind(controller)); // público - ex: confirmação de email

export default router;
