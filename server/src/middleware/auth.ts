import {auth} from 'express-oauth2-jwt-bearer'
import 'dotenv/config'
import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import User from "../models/user";


//
// This code snippet extends the functionality of the Express.js framework
// by adding custom properties to the Request object. Specifically, it adds two properties: userId and auth0Id
declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string;
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async(req:Request,res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.sendStatus(401)
    }
    const token = authorization.split(" ")[1];


    try{
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;
        const user = await User.findOne({auth0Id});
        if(!user){
            return res.sendStatus(401);
        }
        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
    }catch (e) {
        console.log("Error: ", e.message);
        return res.status(401).json({message: "Something went wrong"})
    }
}