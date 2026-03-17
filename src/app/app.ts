import express from "express";
import { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

class App {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use("/api", routes);
  }
}

export default App;
