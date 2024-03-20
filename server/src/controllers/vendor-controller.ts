import {Request, Response} from "express";
import Restaurant from "../models/restaurant";
import {v2 as cloudinary} from 'cloudinary';
import {imageToBase64} from "../utils";

const registerRestaurantController = async(req: Request, res: Response) => {
    try{
        const existingRestaurant = await  Restaurant.findOne({user: req.userId});
        if(existingRestaurant){
            return res.status(409).json({message: "Cannot run multiple restaurants"})
        }

        const dataUri = imageToBase64(req.file as Express.Multer.File);
        const uploadResponse = await cloudinary.uploader.upload(dataUri);
        const newRestaurant = await Restaurant.create({...req.body,
            imageUrl: uploadResponse.url,
            user: req.userId,
            lastUpdated: new Date()
        })
        res.status(201).json(newRestaurant)
    }catch (e) {
        console.log(e.message);
    res.status(500).json("Something went wrong")
    }
}

export default {registerRestaurantController}