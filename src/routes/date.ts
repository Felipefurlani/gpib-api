import { Router } from "express";
import { isHoliday } from "../controllers/date_controller";


const router = Router();

router.get('/feriado/:data', async (req, res, next) => {
    const data = new Date(req.params.data);

    if (isNaN(data.getTime())) {
        res.status(400).send("Formato de data inválido.");
    }

    if (data.getFullYear() >= 1900 && data.getFullYear() <= 2100) {
        res.status(400).send("Ano inválido.");
    }
    
    res.status(200).json(await isHoliday(data).catch(next));
})

export default router