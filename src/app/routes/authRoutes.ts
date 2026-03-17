import { Router } from "express";
import { AuthController } from "../controllers";
import { validateEmail } from "../middlewares";

const router = Router();
const controller = new AuthController();

router.post("/login", validateEmail, controller.login.bind(controller));
router.post("/refresh", controller.refresh.bind(controller));
router.post("/logout", controller.logout.bind(controller));

export default router;
