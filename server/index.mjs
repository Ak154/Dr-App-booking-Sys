import express from "express";
import env from "dotenv"
env.config();
import cors from "cors"
import connectDB from "./config/dbConfig.mjs";
import userRoute from "./routes/userRoute.mjs";
import adminRoute from "./routes/adminRoute.mjs"
import doctorRoute from "./routes/doctorsRoute.mjs"

const app = express();

app.use(express.json())
app.use(cors())

connectDB();

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute)
app.use('/api/doctors', doctorRoute)

let port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})