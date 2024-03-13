
import express from "express";
import userController from "../controllers/user-controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {validateUser} from "../middleware/validation";

const router = express.Router();

router.post('/user', jwtCheck ,userController.registerUserController);
router.get('/user',jwtCheck, jwtParse ,userController.getUserController)
router.put('/user',jwtCheck, jwtParse,validateUser ,userController.updateUserController)
export default router