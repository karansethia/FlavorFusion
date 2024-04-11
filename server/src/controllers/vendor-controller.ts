import {Request, Response} from "express";
import Restaurant from "../models/restaurant";
import Order from "../models/order";
import {v2 as cloudinary} from 'cloudinary';
import {imageToBase64, uploadImage} from "../utils";

const registerRestaurantController = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user: req.userId});
        if (existingRestaurant) {
            return res.status(409).json({message: "Cannot run multiple restaurants"})
        }

        const dataUri = imageToBase64(req.file as Express.Multer.File);
        const uploadResponse = await cloudinary.uploader.upload(dataUri);
        const newRestaurant = await Restaurant.create({
            ...req.body,
            imageUrl: uploadResponse.url,
            user: req.userId,
            lastUpdated: new Date()
        })
        res.status(201).json(newRestaurant)
    } catch (e) {
        console.log(e.message);
        res.status(500).json("Something went wrong")
    }
}
const getVendorController = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId})
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"})
        }
        return res.status(200).json(restaurant)

    } catch (e) {
        res.status(500).json("Something went wrong")
    }
}

const updateVendorController = async (req: Request, res: Response) => {
    console.log("controller working")
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"})
        }
        console.log(req.body.restaurantName)
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if (req.file) {
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save();
        return res.status(200).json({message: "Restaurant updated"})
    } catch (e) {

        res.status(500).json({message: "Something went wrong"})
    }
}

const getVendorOrdersController = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if (!restaurant) {
            return res.status(404).json({message: "Restaurant not found"})
        }
        const orders = await Order.find({restaurant: restaurant._id}).populate("restaurant").populate("user");
        res.json(orders)
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"})
    }
}

const updateVendorOrdersController = async (req: Request, res: Response) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({message: "Order not found"})
        }
        const restaurant = await Restaurant.findById(order!.restaurant);
        if (restaurant?.user?._id.toString() !== req.userId) {
            res.sendStatus(401);
        }
        order!.status = status;
        await order!.save();
        res.status(200).json(order)

    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"})
    }
}


export default {
    registerRestaurantController,
    getVendorController,
    updateVendorController,
    getVendorOrdersController,
    updateVendorOrdersController
}