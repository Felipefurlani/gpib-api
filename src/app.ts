import express, { Application, Request, Response } from "express";
import cors from "cors";
import frutas from "./routes/frutas";
import user from "./routes/user";
import index from "./routes/index";
import cardapio from "./routes/cardapio";
import saldo from "./routes/saldo"

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
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
    this.app.use("/cardapio", cardapio)
    this.app.use("/saldo", saldo)
  }
}

export default new App().app;
