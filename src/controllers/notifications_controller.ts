
import { db } from "../database"; // 
import { newPeriPost, periPost } from "../models/post_peri";
import { APIError } from "../models/api_error";


// Função para obter todas as notificações
export async function getAllNotifications(): Promise<periPost[]> {
    try {
    
      const notifications = await db.selectFrom("post_peri").selectAll().execute();
      return notifications;
    } catch (error) {
      throw new APIError("Failed to fetch notifications", { status: 500 });
    }
  }
  
  // Função para criar uma nova notificação
  export async function createNotification(notification: newPeriPost): Promise<void> {
    try {
    
      const userExists = await db
        .selectFrom("peri_user")
        .where("id", "=", notification.id_peri_user)
        .selectAll()
        .execute();
  
      if (!userExists) {
        throw new APIError("User not found", { status: 404 });
      }
  
     
      await db.insertInto("post_peri").values(notification).execute();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      } else {
        throw new APIError("Failed to create notification", { status: 500 });
      }
    }
  }
  
