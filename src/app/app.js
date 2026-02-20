import e from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

class App {
  constructor() {
    this.app = e();
    this.config();
    this.middlewares();
    this.routes();
  }

  config() {
    this.app.use(e.urlencoded({ extended: true }));
    this.app.use(e.json());
    this.app.use(cookieParser());
  }
  middlewares() {
    this.app.use(errorHandler);
  }
  routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/posts", postRoutes);
    this.app.use("/comment", commentRoutes);
    this.app.use("/auth", authRoutes);
  }
}

export default new App().app;
