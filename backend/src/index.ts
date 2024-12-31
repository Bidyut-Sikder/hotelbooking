
import express ,{Request,Response}from 'express';
import cors from 'cors'
import 'dotenv/config'
import mongoose  from 'mongoose';
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


// app.use(express.static("../../frontend/dist"))

// app.use("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
// })





// connecting frontend and backend
app.use(express.static("../../frontend/dist"))
app.use("*", (req: Request, res: Response) => {
    console.log(path.join(__dirname, "../../frontend/dist/index.html"))
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });


app.get('/api/test',async (req:Request,res:Response) => {
    res.json({message:'hello from api'})
})




app.listen(8000,async () => {
    console.log('server is running on localhost:8000')
})
























