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
    // Prompt Copilot: Create a new task with unique ID and default completed status
});

// PUT (update) a task
router.put('/:id', (req, res) => {
    // Prompt Copilot: Find the task by ID and update its completed status
});

// DELETE a task
router.delete('/:id', (req, res) => {
    // Prompt Copilot: Remove the task with the specified ID from the tasks array
});

module.exports = router;