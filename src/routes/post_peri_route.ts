import { Router } from "express";
import * as post_peri_controller from "../controllers/post_peri_controller";

const router = Router();

router.get("/", async (req, res) => {
    res.send(await post_peri_controller.getAll());
});

router.get("/:id", async (req, res) => {
    const postPeri = req.params;
    res.send(await post_peri_controller.getById(Number(postPeri.id)));
});

router.post("/", async (req, res) => {
    const postPeri = req.body;
    res.send(await post_peri_controller.create(postPeri));
});

router.get("/:description", async (req, res) => {
    const postPeri = req.params;
    res.send(await post_peri_controller.getByDescription(postPeri.description));
});

export default router;