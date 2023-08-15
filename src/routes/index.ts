import { Router } from "express";
import database from "../database";

const router = Router();

router.get("/", (_, res) => {
  res.send("🔥");
});

router.get("/status", (_, res) => {
  res.json({ status: "OK" });
});

router.get("/ping", (_, res) => {
  res.send("pong");
});

router.get("/brew_coffee", (_, res) => {
  res.status(418).send("I'm a teapot");
});

router.get("/teste_db", async (_, res) => {
  const teste = await database.execute("SELECT * FROM Cardapio");
  res.send(teste);
});


router.get("/peri_users", async (_, res) => {
  const teste = await database.execute("SELECT * FROM Cardapio");
  res.send(teste);
});

export default router;
