import {Request, Response} from "express";
import Stripe from 'stripe';
import Restaurant from "../models/restaurant";
import {createLineItems, createSession, type CheckoutSessionRequestType} from "../utils";



const createCheckoutSession = async(req:Request, res:Response) => {
    try{
        const checkoutSessionReq= req.body.checkoutSessionRequest;
        console.log(checkoutSessionReq)
        const restaurant = await Restaurant.findById(checkoutSessionReq.restaurantId);
        console.log(restaurant)
        if(!restaurant){
            console.log("restaurant not found here");
            throw new Error("Restaurant not found");
        }
        const lineItems = createLineItems(checkoutSessionReq, restaurant.menuItems);
        const session = await createSession(lineItems,
            "TEST_ORDER_ID", restaurant.deliveryPrice,restaurant._id.toString())
        if(!session.url){
            res.status(500).json({message: "Error creating stripe session"})
        }
        res.json({url: session.url})

    }catch (e) {
        console.log(e);
        res.status(500).json({message: e.raw.message})
    }
}

export default {createCheckoutSession}

