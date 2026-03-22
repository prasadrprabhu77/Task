import express from "express"
import { login, signUp } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authiddleware.js";
import User from "../model/user.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/profile", authMiddleware, async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
})

export default authRouter;