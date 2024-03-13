import {type Request, type Response} from "express";
import User from "../models/user";

/**
 *  Method to create a document with User model and pushes into MongoDB 'ffdb' database
 * @param req - (Takes auth0Id, email and password as object)
 * @param res - (returns status and json message)
 */
const registerUserController = async(req: Request, res: Response) => {
    const {auth0Id} = req.body;
    const existingUser = await User.findOne({auth0Id});
    if(existingUser){
        return res.status(200).json({message: "User already exists"});
    }
    try{
        const newUser = await User.create({...req.body});
        return res.status(201).json({message: "User successfully created"})
    }catch (e) {
        return res.status(500).json({message: "Something went wrong"})
    }
}
const getUserController = async(req:Request, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({message: "User does not exist"});
        }
        const userDetails = {
            name: user!.name,
            addressLine: user!.address,
            email: user!.email,
            postalCode: user!.postalCode,
            city: user!.city,
            country: user!.country

        }
        res.status(200).json(userDetails)
    }catch (e) {
        res.status(500).json({message: "An internal error occurred"})
    }

}
const updateUserController = async(req: Request, res:Response) => {
    try{
        const {name, addressLine, city,postalCode, country} = req.body;
        console.log(name, postalCode);
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message: "User not found"});

        }
        await User
            .findByIdAndUpdate(user._id,
                {name: name, address: addressLine,city: city,postalCode: postalCode,country: country});
        return res.status(200).json({message: "Successfully updated information"});

    }catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Error updating user"})
    }
}

export default {registerUserController, updateUserController, getUserController}