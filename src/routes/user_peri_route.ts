import { Router } from "express";
import * as user_peri_controller from "../controllers/user_peri_controller";

const router = Router();

router.get("/:id", async (req, res) => {
    const userPeri = req.params;
    res.send(await user_peri_controller.getById(Number(userPeri.id)));
});

router.get("/", async (req, res) => {
    res.send(await user_peri_controller.getAll());
});

export default router;
