import { Router } from "express";
import * as user_peri_controller from "../controllers/user_peri_controller";
import { UserPeri } from "../models/user_peri";

const router = Router();

router.get("/:id", async (req, res) => {
    const userPeri = req.params;
    res.send(await user_peri_controller.getUserPeri(Number(userPeri.id)));
});
/*
router.post("/", async (req, res) => {
    

    res.send(await user_peri_controller.createUserPeri(userPeri));
});
*/
export default router;
