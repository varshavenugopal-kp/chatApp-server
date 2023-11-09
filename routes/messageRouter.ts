import { Router } from "express";
import messageController from "../controllers/messageController";
const router=Router()
router.post('/',messageController.sendMessage)
router.get('/:chatId',messageController.AllMessages)
export default router