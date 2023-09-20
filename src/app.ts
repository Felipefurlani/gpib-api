import express, { Application } from "express";
import cors from "cors";
import "express-async-errors";
import index from "./routes/index";
import { APIError } from "./models/api_error";
import user_router from "./routes/user_peri_route";
import post_router from "./routes/post_peri_route";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.use(App.errorHandler);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.get("/", (_, res) => {
      res.send("Hello World!");
    });

    this.app.use("/", index);
    this.app.use("/user", user_router);
    this.app.use("/post", post_router);
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  static errorHandler: express.ErrorRequestHandler = (err, _, res, _next) => {
    if (err instanceof APIError) {
      console.log("instanceof APIError");
      err.writeResponse(res);
    } else {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };
}

export default new App().app;
