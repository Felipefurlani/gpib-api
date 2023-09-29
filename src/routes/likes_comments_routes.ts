


import { Router } from "express";
import * as likesCommentsController from "../controllers/likes_comments_controller";

const router = Router();

router.get("/likes", likesCommentsController.getLikes);
router.post("/like/:id", likesCommentsController.likePost);
router.get("/comments/:id", likesCommentsController.getComments);
router.post("/comment/:id", likesCommentsController.addComment);

export default router;