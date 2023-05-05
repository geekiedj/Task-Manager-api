const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
}); //This is a substitute and refactored version of the other operation.
//Instead of using a try ctach which can become redundant and repetitive,
//we created a middleware to handle that called gthe asyncWrapper and then called it in the getAllTask controller.
//I won't be doing the others like this just so that i can i easily understand the code when i come back to it.

//create task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task }); //same as res.send("create tasks")
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//get single task
const getTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError`No task with id : ${taskID}`, 404);
      // const error = new Error("Not Found");
      // error.status = 404;
      // return next(error)
      // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task }); //res.send("get single task")
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//update task
const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return next(createCustomError`No task with id : ${taskID}`, 404);
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error }); //res.send("update task")
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return next(createCustomError`No task with id : ${taskID}`, 404);
    }
    res.status(200).json({ task }); //res.status(200).send("delete task")
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
