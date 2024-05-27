const Task = require('../data_mongo/schemas/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    // Convertendo ObjectId para string
    const tasksWithStringId = tasks.map(task => ({
      ...task.toObject(),
      _id: task._id.toString()
    }));
    res.json(tasksWithStringId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  const requestedId = parseInt(req.params._id);
  try {
    const task = await Task.findById(requestedId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send(`Task with ID ${requestedId} not found`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const body = req.body;
  const newTask = new Task({
    text: body.text,
    date: new Date(body.date),
    done: false,
  });
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const requestedId = parseInt(req.params._id);
  const body = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(requestedId, body, { new: true });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).send(`Task with ID ${requestedId} not found`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const requestedId = parseInt(req.params._id);
  try {
    const deletedTask = await Task.findByIdAndDelete(requestedId);
    if (deletedTask) {
      res.status(204).send();
    } else {
      res.status(404).send(`Task with ID ${requestedId} not found`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
