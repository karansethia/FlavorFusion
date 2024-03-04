import {type Request, type Response} from "express";
import User from "../models/user";

const registerController = async(req: Request, res: Response) => {
    const {auth0Id} = req.body;
    const existsingUser = await User.findOne({auth0Id});
    if(existsingUser){
        return res.status(200).json({message: "User already exists"});
    }
    try{
        const newUser = await User.create({...req.body});
        return res.status(201).json({message: "User successfully created"})
    }catch (e) {
        return res.status(500).json({message: "Something went wrong"})
    }
    // check if user exists
    // create user if user does not exist
    //return if registration successful
}

export default {registerController}