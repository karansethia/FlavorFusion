import express from "express";
import {jwtCheck, jwtParse} from "../middleware/auth";
import orderController from "../controllers/order-controller";

const router = express.Router();

router.post('/checkout/create-checkout-session', jwtCheck, jwtParse, orderController.createCheckoutSessionController);
router.post('/checkout/webhook',orderController.stripeWebhookController)
export default router