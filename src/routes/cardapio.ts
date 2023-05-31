import { Router } from "express";
import { getCardapio } from "../controllers/cardapio_controller";

const router = Router()

router.get('/:data', async (req, res) => {
    const data = req.params.data
    console.log(data)
    res.send(await getCardapio(data))
})



export default router