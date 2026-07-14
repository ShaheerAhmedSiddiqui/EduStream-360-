import dotenv from "dotenv"
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/student.js'
import instructorRoutes from './routes/intructor.js'
import { configDotenv } from 'dotenv';


connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    return "Hello From School"
})

app.use("/api/auth", authRoutes);
// app.use("/api/admin", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/intructor", instructorRoutes);
// app.use("/api/lectures", authRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{console.log(`Server is running on ${PORT}`)});