import {MenuItemType} from "../models/restaurant";
import Stripe from "stripe";

export const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const frontendUrl = process.env.FRONTEND_URL as string;


/**
 * This code takes an image file uploaded via a request (req.file) and converts
 * it to a base64-encoded data URI. It first converts the file buffer to a base64-encoded string,
 * then constructs a data URI string containing the MIME type of the image and the base64-encoded image data.
 * @param image
 */
export const imageToBase64 = (image: Express.Multer.File) : string => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    return `data:${image.mimetype};base64,${base64Image}`
}

export type CheckoutSessionRequestType = {
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
        country:string;
        postalCode: number;
    };
    restaurantId: string;
}
export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequestType, menuItems: MenuItemType[]) => {
    // => for each cart item get the menu item from the restaurant
    // => for each cart item convert it to stripe line item
    // => return line item array
    // console.log(menuItems)
    return checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find(item => item._id.toString() === cartItem.menuItemId.toString())

        if (!menuItem) {
            throw new Error("Menu Item not found")
        }
        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "USD",
                unit_amount: menuItem.price,
                product_data: {name: menuItem.name}
            },
            quantity: parseInt(cartItem.quantity),

        }
        return line_item
    })

}

export const createSession = async(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
                            orderId: string,deliveryPrice: number,
                            restaurantId: string) => {
    console.log(lineItems)

    return await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [{
            shipping_rate_data: {

                display_name: "Delivery",
                type: "fixed_amount",
                fixed_amount: {
                    amount: deliveryPrice,
                    currency: "USD"
                }
            },

        }],
        mode: "payment",

        metadata: {
            orderId,
            restaurantId
        },
        success_url: `${frontendUrl}/order-status?success=true`,
        cancel_url: `${frontendUrl}/detail/${restaurantId}?cancelled=true`
    })
}