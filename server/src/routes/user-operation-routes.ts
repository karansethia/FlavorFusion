import express from 'express';
import userOperationController from "../controllers/user-operation-controller";
import {param} from "express-validator";

const router = express.Router()

router.get('/search/:city',
    param("city").isString()
        .trim().notEmpty().withMessage("City is required"),
    userOperationController.searchRestaurant);

router.get('/:restaurantId', param("restaurantId").isString()
        .trim().notEmpty().withMessage("RestaurantId is required"),
    userOperationController.getRestaurantDetails)
export default router