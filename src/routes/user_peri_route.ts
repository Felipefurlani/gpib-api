import { Router } from "express";
import * as user_peri_controller from "../controllers/user_peri_controller";
import { db } from "../database";

const router = Router();

router.get("/:id", async (req, res) => {
    const userPeri = req.params;
    res.send(await user_peri_controller.getById(Number(userPeri.id)));
});

router.get("/", async (req, res) => {
    res.send(await user_peri_controller.getAll());
});

router.post("/login", async (req, res) => {
    const credentials = req.body;

    if (!credentials.email || !credentials.password) {
        res.status(400).send("email and password are required");
        return;
    }
    if (!(await user_peri_controller.login(credentials.email, credentials.password))) {
        res.status(401).send("invalid credentials");
        return;
    } else {
        res.send("login successful");
        res.cookie("email", credentials.email);
    }
});

router.get("/email/:email", async (req, res) => {
    const emailUser = req.params.email;
    res.send(await user_peri_controller.getByEmail(emailUser));
});

router.post("/", async (req, res) => {
    const userPeri = req.body;
    res.send(await user_peri_controller.create(userPeri));
});

router.patch("/", async (req, res) => {
    const userPeri = req.body;
    res.send(await user_peri_controller.deleteById(Number(userPeri.id)));
});

// not working
router.get("/whoami", async (req, res) => {
    const email = req.cookies.email;
    if (!email) {
        res.status(401).send("not logged in");
        return;
    }
    res.send("logged with email: " + email);
});

router.get("/howmany", async (req, res) => {
    res.send(await user_peri_controller.count());
});

export default router;
