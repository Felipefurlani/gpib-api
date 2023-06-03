import { Router } from "express";
import * as Cardapio from "../controllers/cardapio_controller";
import { APIError } from "../models/api_error";

const router = Router();

router.get("/:data", async (req, res, next) => {
  const date = new Date(req.params.data);

  if (isNaN(date.getTime()))
    next(new APIError("Data inválida", { status: 400 }));

  const cardapio = await Cardapio.findByDate(date).catch(next);
  res.send(cardapio);
});

router.get("/mes/:mes", async (req, res, next) => {
  const month = Number(req.params.mes);

  if (isNaN(month) || month < 1 || month > 12)
    next(new APIError("Mês inválido", { status: 400 }));

  const cardapios = await Cardapio.findByMonth(month).catch(next);
  res.send(cardapios);
});

router.get("/", async (_, res, next) => {
  const cardapios = await Cardapio.findAll().catch(next);
  res.send(cardapios);
});

router.post("/", async (req, res, next) => {
  const cardapio = req.body;

  if (!cardapio) next(new APIError("Cardápio inválido", { status: 400 }));

  await Cardapio.create(cardapio).catch(next);
  res.send("Cardápio adicionado com sucesso!");
});

export default router;
