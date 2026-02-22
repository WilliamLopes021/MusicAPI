import e from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import postRoutes from "./routes/post.routes.js";

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
