import e from "express";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

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
  }
  middlewares() {
    this.app.use(errorHandler);
  }
  routes() {
    this.app.use(userRoutes);
    this.app.use("/post", postRoutes);
    this.app.use("/comment", commentRoutes);
  }
}

export default new App().app;
