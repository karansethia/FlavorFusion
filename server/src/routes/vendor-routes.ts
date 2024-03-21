import express, {NextFunction, Request, Response} from "express";
import multer from "multer";
import vendorController from "../controllers/vendor-controller";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateVendor} from "../middleware/validation";

const router = express.Router();

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    next()
}

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

router.get('/restaurant', jwtCheck,jwtParse, vendorController.getVendorController);
router.put('/restaurant',validateVendor, jwtCheck,jwtParse, vendorController.updateVendorController)
router.post('/restaurant',upload.single("imageFile"),validateVendor,jwtCheck, jwtParse , vendorController.registerRestaurantController)


export default router;