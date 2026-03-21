import express from "express"
import { createTask } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authiddleware.js";


const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask)

export default taskRouter;