import Task from "../model/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id, 
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTask = async (req, res) => {
  try {

    const tasks = await Task.find({user: req.user.id})
    if(!tasks) return res.status(500).send({"error":"Tasks were not found.."})

    res.status(201).json({
      message:"Tasks fetched...",
      tasks
    });
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findOne({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    // 3. Save updated task
    const updatedTask = await task.save();

    // 4. Response
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};