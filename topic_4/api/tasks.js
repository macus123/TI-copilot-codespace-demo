const express = require('express');
const router = express.Router();

// In-memory storage for tasks
let tasks = [];

// GET all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// POST a new task
router.post('/', (req, res) => {
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT (update) a task
router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = router;