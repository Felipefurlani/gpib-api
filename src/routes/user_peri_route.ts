import { Router } from "express";
import * as user_peri_controller from "../controllers/user_peri_controller";

const router = Router();

router.get("/user/:id", (req, res) => {
    const userPeri = req.params;
    res.send(user_peri_controller.getUserPeri(Number(userPeri.id)));
});

export default router;