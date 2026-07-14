import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import studentRoutes from './routes/student'
import instructorRoutes from './routes/intructor'


connectDB();
const app = express();

app.use("/api/auth", authRoutes);
// app.use("/api/admin", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/intructor", instructorRoutes);
// app.use("/api/lectures", authRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{console.log(`Server is running on ${PORT}`)});