import express from "express";
import multer from "multer";
import vendorController from "../controllers/vendor-controller";

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
router.post('/restaurant',upload.single("imageFile"), vendorController.registerRestaurant)


module.exports = router;