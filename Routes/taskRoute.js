import express from "express"
import { createTask, getTask, updateTask } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authiddleware.js";


const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask)
taskRouter.get("/", authMiddleware, getTask)
taskRouter.post("/:id", authMiddleware, updateTask)

export default taskRouter;