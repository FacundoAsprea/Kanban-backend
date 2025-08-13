const tasksRouter = require("express").Router();
const Task = require("../model/task.model");

const getAllTasks = async (req, res) => {
    console.log("getAllTasks...")
  const response = await Task.find({});
  res.send(response);
};

const getTask = async (req, res) => {
    console.log("getTask...")
  const id = req.params.id;
  const response = await Task.findById(id);

  if (typeof response != "object") {
    res.send(404).status(404).end();
    return;
  }
  res.send(response);
};

const createTask = async (req, res) => {
    console.log("createTask...")
  const task = req.body;

  try {
    const newTask = new Task(task);
    await newTask.save();
    res.status(201).end()
  } catch (err) {
    if (err.code === 11000) {
      res.status(401).send({ error: "Duplicates are not allowed" })
      return;
    }
    res.send(err)
  }
};

const deleteTask = async (req, res) => {
    console.log("deleteTask...")
  const id = req.params.id
  const response = await Task.findByIdAndDelete(id)

  console.log("borrado: ", response)
  res.send(response)
}

const updateTask = async (req, res) => {
    console.log("updateTask...")
  const id = req.params.id
  const updatedTask = req.body

  const response = await Task.findByIdAndUpdate(id, updatedTask)
  res.send(response)
}

tasksRouter.get("/", getAllTasks);
tasksRouter.get("/:id", getTask);
tasksRouter.delete("/:id", deleteTask)
tasksRouter.post("/", createTask);
tasksRouter.put("/:id", updateTask)

module.exports = tasksRouter;
