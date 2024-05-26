const express = require('express');
const router = express.Router();

// Controlador para tarefas
const tasks = require('../controllers/tasks');

// Rota para obter todas as tarefas
router.get('/tasks', tasks.getTasks);

module.exports = router;