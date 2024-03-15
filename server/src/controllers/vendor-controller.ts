import {Request, Response} from "express";
import Restaurant from "../models/restaurant";

const registerRestaurant = async(req: Request, res: Response) => {
    try{
        const existingRestaurant = await  Restaurant.find({user: req.userId});
        if(existingRestaurant){
            return res.status(409).json({message: "Cannot run multiple restaurants"})
        }

        const dataUri = imageToBase64(req.file as Express.Multer.File)
    }catch (e) {
        console.log(e.message);
    res.status(500).json("Something went wrong")
    }
}

export default {registerRestaurant}