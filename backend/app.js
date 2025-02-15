import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/Userroute.js'

const app = express();
config();

connect(process.env.MONGO_URI, {
    
}).then(() => {
    console.log("Connected successfully to local MongoDB");
}).catch((err) => {
    console.log(err.message);
});

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};
app.options('*', cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))

  app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/user',userRoutes)


app.listen(3001,()=>{
    console.log("server is running on port 3001")
})

