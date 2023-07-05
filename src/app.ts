import express, { Application } from "express";
import cors from "cors";
import frutas from "./routes/frutas";
import user from "./routes/user";
import index from "./routes/index";
import cardapio from "./routes/cardapio";
import saldo from "./routes/saldo";
import { APIError } from "./models/api_error";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.routes();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(App.errorHandler);
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
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  static errorHandler: express.ErrorRequestHandler = (err, _, res, _next) => {
    if (err instanceof APIError) return err.writeResponse(res);
    else return res.status(500).send("Internal Server Error");
  };
}

export default new App().app;
