
import express,{type Request, type Response} from "express";
import userController from "../controllers/user-controller";
import user from "../models/user";

const router = express.Router();

router.post('/user',userController.registerController);
export default router