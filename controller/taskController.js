import Task from "../model/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // 1. Validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // 2. Create Task
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id, // 🔥 from auth middleware
    });

    // 3. Response
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};