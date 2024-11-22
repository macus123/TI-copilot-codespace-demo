const express = require('express');
const { body, param, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

/* 
This file contains the Express router for handling API requests related to tasks. 
It includes routes for creating, reading, updating, and deleting tasks. 
Input validation and sanitization are also implemented here using express-validator and sanitize-html.

Key Functions:
GET /api/tasks: Fetch all tasks.
POST /api/tasks: Create a new task.
PUT /api/tasks/:id: Update a task's completion status.
DELETE /api/tasks/:id: Delete a task.
*/

const router = express.Router();

// Mock database
let tasks = [];

// GET /api/tasks: Fetch all tasks
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /api/tasks: Create a new task
router.post('/tasks', 
    body('title').isString().notEmpty().trim().escape(),
    body('description').isString().optional().trim().escape(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedDescription = sanitizeHtml(description || '');

        const newTask = { id: tasks.length + 1, title: sanitizedTitle, description: sanitizedDescription, completed: false };
        tasks.push(newTask);
        res.status(201).json(newTask);
    }
);

// PUT /api/tasks/:id: Update a task's completion status
router.put('/tasks/:id', 
    param('id').isInt(),
    body('completed').isBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { completed } = req.body;

        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.completed = completed;
        res.json(task);
    }
);

// DELETE /api/tasks/:id: Delete a task
router.delete('/tasks/:id', 
    param('id').isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }

        tasks.splice(taskIndex, 1);
        res.status(204).send();
    }
);

module.exports = router;