import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

connectDB();

app.get("/",(req,res)=> {
  res.send("Working...")
})

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`)
});
