import { Router } from "express";
import {db} from "../database";

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

export default router;
