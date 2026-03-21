import express from "express"
import { login, signUp } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/dummy", authMiddleware,(req,res)=> res.send("dummy working"))

export default authRouter;