import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth";
import orderController from "../controllers/order-controller";

const router = express.Router();

router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, orderController.createCheckoutSession)
export default router