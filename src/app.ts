import express, { Application } from "express";
import cors from "cors";
import "express-async-errors";
import frutas from "./routes/frutas";
import user from "./routes/user";
import index from "./routes/index";
import cardapio from "./routes/cardapio";
import saldo from "./routes/saldo";
import date from "./routes/date";
import { APIError } from "./models/api_error";

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
    this.app.use("/user", user);
    this.app.use("/frutas", frutas);
    this.app.use("/cardapio", cardapio);
    this.app.use("/saldo", saldo);
    this.app.use("/date", date);
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  static errorHandler: express.ErrorRequestHandler = (err, _, res, _next) => {
    console.error("ErrorHandler", err);

    if (err instanceof APIError) {
      console.log("instanceof APIError");
      err.writeResponse(res);
    } else {
      console.log("not instanceof APIError");
      res.status(500).send("Internal Server Error");
    }
  };
}

export default new App().app;
