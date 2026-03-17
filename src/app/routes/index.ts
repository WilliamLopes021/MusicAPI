import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import articleRoutes from "./articleRoutes";
import commentRoutes from "./commentRoutes";
import validationRoutes from "./validationRoutes";
import administratorRoutes from "./administratorRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/validations", validationRoutes);
router.use("/administrators", administratorRoutes);

export default router;
