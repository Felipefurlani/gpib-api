import { Router } from "express";
import * as notification_controller from "../controllers/notifications_controller";
import { newPeriPost } from "../models/post_peri";

const router = Router();

// Rota para obter todas as notificações
router.get("/notifications", async (_, res) => {
  res.send(await notification_controller.getAllNotifications());
});

// Rota para criar uma nova notificação
router.post("/notifications", async (req, res) => {
  const newNotification: newPeriPost = req.body; 
  await notification_controller.createNotification(newNotification);
  res.status(201).json({ message: "Notification created successfully" });
});

// Outras rotas existentes para postagens podem permanecer inalteradas

export default router;