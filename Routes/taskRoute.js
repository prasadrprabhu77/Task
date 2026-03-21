import express from "express"
import { createTask, deleteTask, getTask, updateTask } from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authiddleware.js";


const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, createTask)
taskRouter.get("/", authMiddleware, getTask)
taskRouter.put("/:id", authMiddleware, updateTask)
taskRouter.delete("/:id", authMiddleware, deleteTask)

export default taskRouter;