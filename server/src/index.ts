import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user-routes";
import 'dotenv/config';
import connectDB from "./db/mongo";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', userRoutes)
app.listen(3000,() => {
    try{
        connectDB(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
    }catch (e) {
        console.log(e);
    }

})