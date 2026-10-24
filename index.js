import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./database/dbConfig.js";
import studentRouter from "./routers/student.router.js"
import mentorRouter from "./routers/mentor.router.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mentor", mentorRouter)
app.use("/api/student", studentRouter)

connectDB();
app.listen(process.env.PORT, () => {
    console.log("app started");
    
})