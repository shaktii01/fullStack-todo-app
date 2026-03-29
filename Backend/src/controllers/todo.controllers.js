const todoModel = require("../models/todo.model");

// Controller functions for handling todo operations
const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await todoModel.create({
      title,
      description,
      user: req.user._id
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};