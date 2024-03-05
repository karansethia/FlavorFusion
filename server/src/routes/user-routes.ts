
import express from "express";
import userController from "../controllers/user-controller";
import {jwtCheck} from "../middleware/auth";

const router = express.Router();

router.post('/user' ,userController.registerController);
export default router