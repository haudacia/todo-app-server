const { tasks } = require("../data/index");
const Task = require('../data_mongo/schemas/task');

//ABAJO: con mongo: esta bien solo esa linea para recoger 
//todos los items? o sea, solo sustituir el array de objetos 
// tasks (en la carpeta data) por Task de schemas? 
/*
const getTasks = async (req, res) => {
  res.json(Task);
};
*/


const getTasks = async (req, res) => {
  res.json(tasks);
};

const getTask = async (req, res) => {
  const requestedId = parseInt(req.params.id);
  const matchingTask = tasks.find((task) => task.id === requestedId);
  if (matchingTask) {
    res.status(200).json(matchingTask);
  } else {
    res.status(404).send(`Task with ID ${requestedId} not found`);
  }
};

const createTask = async (req, res) => {
  const body = req.body;
  const newTask = {
    id: tasks.length + 1,
    text: body.text,
    date: new Date(body.date),
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(tasks);
};

// // get por id con mongo:
// const getTask = async (req, res) => {
//   const taskById = await Task.consolefindById(req.params.id);
//   if (taskById) {
//     res.status(200).json(taskById);
//   } else {
//     res.status(404).send(`Task not found`);
//   }
// };

// //------------- get by query/matching term
// const getTaskQuery = async (req, res) => {
//   const queryString = req.query || {};
//   const matchingTasks = await Task.find(queryString);
//   res.json(matchingTasks);
// }

// // con mongo, create(POST): --------------------
// const createTask = async (req, res) => {
//   const body = req.body;
//   console.log(body);
//   const data = {
//     text: body.text,
//     date: body.date,
//     done: false
//   }
// };

// // nueva instancia de task
// const newTask = new Task(data);

// //guardarlo en mongo:
// try {
//   console.log('saving new task');
//   await newTask.save();
//   res.json(newTask);
// } catch (error) {
//   console.log(error);
//   res.status(500).json(error)
// };

const updateTask = async (req, res) => {
  const requestedId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === requestedId);
  const body = req.body;
  if (index !== -1) {
    const updatedTask = { ...tasks[index], ...body };
    tasks[index] = updatedTask;
    res.status(200).send(tasks);
  } else {
    res
      .status(404)
      .send(`Task with ID ${requestedId} not found`);
  }
};

const deleteTask = async (req, res) => {
  const requestedId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === requestedId);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.status(204).send();
    console.log(deletedTask)
  } else {
    res.status(404).send(`Task with ID ${requestedId} not found`);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask 
};