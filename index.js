import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./Routes/authRoute.js";
import cors from "cors"
import taskRouter from "./Routes/taskRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors())
app.use(express.json())

connectDB();

app.get("/",(req,res)=> {
  res.send("Working...")
})

//auth Router
app.use("/auth", authRouter)

//task Router
app.use("/task", taskRouter)


app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
});
