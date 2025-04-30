import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter);
app.use('/users',userRoutes);

//routes

//start the server
const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})