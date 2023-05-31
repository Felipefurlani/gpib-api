import { Router } from "express";
import { getCardapio } from "../controllers/cardapio_controller";

const router = Router()

router.get('/:data', async (req, res) => {
    const data = req.params.data
    console.log(data)
    try{
        res.send(await getCardapio(data))
    }catch(err){
        res.status(404).send('Cardapio indisponível!')
    }
    
})



export default router