import { Router } from "express";
import chatController from "../controllers/chatController";
const router=Router()

router.post('/',chatController.createChat)
router.get('/userChat/:userid',chatController.getAllChat)


export default router