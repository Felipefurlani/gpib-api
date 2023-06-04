import { Router } from "express";
import * as Cardapio from "../controllers/cardapio_controller";
import { APIError } from "../models/api_error";

const router = Router();

router.get("/", async (_, res, next) => {
  const cardapios = await Cardapio.cardapioHoje().catch(next);
  res.send(cardapios);
});

router.get("/data/:data", async (req, res, next) => {
  const date = new Date(req.params.data);

  if (isNaN(date.getTime())) {
    next(
      new APIError("Data inválida", {
        status: 400
      })
    );
  }

  const cardapio = await Cardapio.findByDate(date).catch(next);
  res.send(cardapio);
});

router.get("/hoje", async (_, res, next) => {
  const cardapios = await Cardapio.cardapioHoje().catch(next);
  res.send(cardapios);
});

router.get("/dia", async (_, res, next) => {
  const cardapios = await Cardapio.cardapioHoje().catch(next);
  res.send(cardapios);
});

router.get("/dia/:dia", async (req, res, next) => {
  const day = Number(req.params.dia);

  if (isNaN(day) || day < 1 || day > 31)
    next(new APIError("Dia inválido", { status: 400 }));

  const cardapios = await Cardapio.findByDay(day).catch(next);
  res.send(cardapios);
});

router.get("/mes", async (_, res, next) => {
  const cardapios = await Cardapio.cardapiosMes().catch(next);
  res.send(cardapios);
});

router.get("/mes/:mes", async (req, res, next) => {
  const month = Number(req.params.mes);

  if (isNaN(month) || month < 1 || month > 12)
    next(new APIError("Mês inválido", { status: 400 }));

  const cardapios = await Cardapio.findByMonth(month).catch(next);
  res.send(cardapios);
});

router.get("/semana", async (_, res, next) => {
  const cardapios = await Cardapio.cardapiosSemana().catch(next);
  res.send(cardapios);
});

router.get("/semana/:semana", async (req, res, next) => {
  const week = Number(req.params.semana);

  if (isNaN(week) || week < 1 || week > 53)
    next(new APIError("Semana inválida", { status: 400 }));

  const cardapios = await Cardapio.findByWeek(week).catch(next);
  res.send(cardapios);
});

router.get("/ano", async (_, res, next) => {
  const cardapios = await Cardapio.cardapiosAno().catch(next);
  res.send(cardapios);
});

router.get("/ano/:ano", async (req, res, next) => {
  const year = Number(req.params.ano);

  if (isNaN(year)) {
    next(
      new APIError("Ano inválido", {
        status: 400
      })
    );
  }

  const cardapios = await Cardapio.findByYear(year).catch(next);
  res.send(cardapios);
});

router.get("/todos", async (_, res, next) => {
  const cardapios = await Cardapio.findAll().catch(next);
  res.send(cardapios);
});

router.post("/", async (req, res, next) => {
  const cardapio = req.body;

  // Aqui deveria ter uma validação
  // Recomendo usar zod
  if (!cardapio) {
    next(
      new APIError("Cardápio inválido", {
        status: 400
      })
    );
  }

  await Cardapio.create(cardapio).catch(next);
  res.send("Cardápio adicionado com sucesso!");
});

router.get("/:data", async (req, res, next) => {
  const date = new Date(req.params.data);

  if (isNaN(date.getTime())) {
    next(
      new APIError("Data inválida", {
        status: 400
      })
    );
  }

  const cardapio = await Cardapio.findByDate(date).catch(next);
  res.send(cardapio);
});

export default router;
