import { Router } from "express";
import { getSaldo } from "../controllers/aluno_controller";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;

  const saldo = await getSaldo({ ra: body.ra, senha: body.senha });
  res.send(saldo);
});

export default router;
