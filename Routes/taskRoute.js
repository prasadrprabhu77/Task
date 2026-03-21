import express from "express"
import { createTask, getTask } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authiddleware.js";


const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask)
taskRouter.get("/", authMiddleware, getTask)

export default taskRouter;