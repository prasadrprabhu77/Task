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


app.get("/",(req,res)=> {
  res.send("Working...")
})

//auth Router
app.use("/auth", authRouter)

//task Router
app.use("/task", taskRouter)


const startServer = async () => {
  try {
    await connectDB(); // ✅ wait here

    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server ❌", error);
  }
};

startServer();