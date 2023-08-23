import { Router } from "express";
import { db } from "../database";

const router = Router();

router.get("/", (_, res) => {
  res.send("🔥");
});

router.get("/status", (_, res) => {
  res.json({ status: "OK" });
});

export default router;
