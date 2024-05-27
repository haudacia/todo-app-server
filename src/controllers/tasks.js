const Task = require('../data_mongo/schemas/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  const requestedId = parseInt(req.params._id.toString());
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
  try {
    const { text, date } = req.body;
    const newTask = new Task({
      text,
      date,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { text, date } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, {
      text: text,
      date: date
      //done: updatedStatus //add later, must incorporate updateTaskStatus to handleUpdateTask.
    }, { new: true });
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
  const { id } = req.params.id;
  console.log(`Received ID to delete: ${id}`);

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
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
