import express from "express"
import { login, signUp } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/profile", authMiddleware, async (req,res)=> {
     const user = await User.findById(req.user.id).select("-password");
  res.json(user);
})

export default authRouter;