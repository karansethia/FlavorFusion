import express from "express";
import multer from "multer";
import vendorController from "../controllers/vendor-controller";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateVendor} from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})
/**
 * Post request to create new restaurant
 */
router.post('/restaurant',upload.single("imageFile"),validateVendor,jwtCheck, jwtParse , vendorController.registerRestaurant)


export default router;