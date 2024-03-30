import {Request, Response} from "express";
import Stripe from 'stripe';
import Restaurant, {MenuItemType} from "../models/restaurant";
import {createLineItems, createSession} from "../utils";


type CheckoutSessionRequestType = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine: string;
        city: string;
        postalCode: string;
    };
    restaurantId: string;
}

const createCheckoutSession = async(req:Request, res:Response) => {
    try{
        const checkoutSessionRequest: CheckoutSessionRequestType = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
        if(!restaurant){
            throw new Error("Restaurant not found")
        }
        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
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

