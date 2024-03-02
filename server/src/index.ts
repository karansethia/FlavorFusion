import express,{Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./db/mongo";

const app = express();

app.use(express.json());
app.use(cors());
app.get('/test', async(req: Request, res: Response) => {
    res.json({"message": "Hi this is working"})
})
app.listen(3000,() => {
    try{
        connectDB(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
    }catch (e) {
        console.log(e);
    }

})