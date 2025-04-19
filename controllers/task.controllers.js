const tasks = require("../models/task.model.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
exports.getAllTasks = async (req, res) => {
  try {
    const tasksList = await tasks.find({ createdBy: req.userId });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  try {
    const newTask = new tasks({
      title,
      description,
      createdBy: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  try {
    const updatedTask = await tasks.findOneAndUpdate(
      { _id: ObjectId(id), createdBy: req.userId },
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await tasks.findOneAndDelete({
      _id: ObjectId(id),
      createdBy: req.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await tasks.findOne({
      _id: ObjectId(id),
      createdBy: req.userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task" });
  }
};
exports.getTaskByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const task = await tasks.findOne({
      title: { $regex: title, $options: "i" },
      createdBy: req.userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task" });
  }
};
exports.getTasksByCompletion = async (req, res) => {
  const { completed } = req.params;
  try {
    const tasksList = await tasks.find({
      completed: completed === "true",
      createdBy: req.userId,
    });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.getTasksByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const tasksList = await tasks.find({
      createdAt: { $gte: new Date(date) },
      createdBy: req.userId,
    });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasksList = await tasks.find({ createdBy: ObjectId(userId) });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.getTaskByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const tasksList = await tasks.find({
      status,
      createdBy: req.userId,
    });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.getTasksByDueDate = async (req, res) => {
  const { dueDate } = req.params;
  try {
    const tasksList = await tasks.find({
      dueDate: { $gte: new Date(dueDate) },
      createdBy: req.userId,
    });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
exports.getTasksByAssignedTo = async (req, res) => {
  const { assignedTo } = req.params;
  try {
    const tasksList = await tasks.find({
      assignedTo: ObjectId(assignedTo),
      createdBy: req.userId,
    });
    res.status(200).json(tasksList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};
