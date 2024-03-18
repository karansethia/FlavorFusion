import {body, validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

const handleValidationErrors = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    next();
}
export const validateUser = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine").isString().notEmpty().withMessage("Address must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    body("postalCode").isNumeric().notEmpty().withMessage("Postal Code must be a number"),
    handleValidationErrors
]

export const validateVendor = [
    body("restaurantName").isString().notEmpty().withMessage("Name of restaurant is required"),
    body("city").isString().notEmpty().withMessage("City is required"),
    body("country").isString().notEmpty().withMessage("Country name is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min: 0}).withMessage("Delivery time must be a positive number"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines cant be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array").not().isEmpty().withMessage("Cuisines cant be empty"),
    body("menuItems.*.name").notEmpty().withMessage("Name of the menu items is required"),
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Price of the menu items is required"),
    handleValidationErrors
]