import { Router } from "express";
import userController from "../controllers/userController";

const router= Router()

router.post('/register', userController.signup)
// router.post('/check',)
router.post('/login',userController.loginUser)
router.get('/users',userController.allUsers)

export default router