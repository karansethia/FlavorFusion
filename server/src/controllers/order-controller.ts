import {Request, Response} from "express";
import Restaurant from "../models/restaurant";
import {createLineItems, createSession, STRIPE} from "../utils";
import Order from "../models/order";


const getOrdersController = async(req: Request, res: Response) => {
    try{
        const orders = await Order.find({user: req.userId}).populate("restaurant").populate("user")
        res.json(orders)
    }catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"})
    }
}

const stripeWebhookController = async(req:Request, res:Response) => {
    let event
    try{
        const sig = req.headers['stripe-signature'];
        event = STRIPE.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET as string)

    }catch (e) {
        console.log(e);
        return res.status(400).send(`webhook error : ${e.message}`);
    }
    if(event.type === "checkout.session.completed"){
        const order = await Order.findById(event.data.object.metadata?.orderId);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        order.totalAmount = event.data.object.amount_total;
        order.status = "paid";
        await order.save();
    }
    res.sendStatus(200);
}

const createCheckoutSessionController = async(req:Request, res:Response) => {
    try{
        const checkoutSessionReq= req.body.checkoutSessionRequest;

        const restaurant = await Restaurant.findById(checkoutSessionReq.restaurantId);

        if(!restaurant){
            throw new Error("Restaurant not found");
        }
        const newOrder = new Order({restaurant: restaurant,user: req.userId, status: "placed", deliveryDetails: checkoutSessionReq.deliveryDetails, cartItems: checkoutSessionReq.cartItems, createdAt: new Date()},)
        console.log(newOrder._id)
        const lineItems = createLineItems(checkoutSessionReq, restaurant.menuItems);
        const session = await createSession(lineItems,
            newOrder._id.toString(), restaurant.deliveryPrice,restaurant._id.toString())
        if(!session.url){
            res.status(500).json({message: "Error creating stripe session"})
        }
        await newOrder.save()
        res.json({url: session.url})

    }catch (e) {
        console.log(e);
        res.status(500).json({message: e.raw.message})
    }
}

export default {createCheckoutSessionController, stripeWebhookController, getOrdersController}

