const Task = require("../models/Task");

const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); //same as res.send("create tasks")
};

const getTask = (req, res) => {
  res.json({ id: req.params.id }); //res.send("get single task")
};

const updateTask = (req, res) => {
  res.json({ id: req.params.id }); //res.send("update task")
};

const deleteTask = (req, res) => {
  res.json({ id: req.params.id }); // res.send("delete task")
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
