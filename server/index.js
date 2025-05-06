import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import songRoutes from './routes/songRoutes.js';
import fs from 'fs';
import path from 'path';

dotenv.config();
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const app=express();


//middleware
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter);
app.use('/users',userRoutes);
app.use('/artists',artistRoutes);
app.use('/songs',songRoutes);
//routes

//start the server
const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})