import express,{Request, Response} from 'express';
import cors from 'cors';
import userRoutes from "./routes/user-routes";
import vendorRoutes from './routes/vendor-routes'
import userOperationRoutes from "./routes/user-operation-routes";
import 'dotenv/config';
import connectDB from "./db/mongo";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})


const app = express();

app.use(express.json());
app.use(cors());


app.get('/health',async(req:Request, res:Response)=> {
    res.json({message: "Health ok"})
})
app.use('/api/v1', userRoutes);
app.use('/api/v1', vendorRoutes);
app.use('/api/v1/op', userOperationRoutes);
app.listen(3000,() => {
    try{
        connectDB(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
    }catch (e) {
        console.log(e.message);
    }

})