const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// In-memory tasks array
let tasks = [];

// Input validation middleware
const validateTask = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters')
        .custom((value) => {
            const clean = sanitizeHtml(value, {
                allowedTags: [],
                allowedAttributes: {}
            });
            if (clean !== value) {
                throw new Error('Title contains unsafe HTML');
            }
            return true;
        })
];

const validateId = [
    param('id').isInt().toInt()
];

// Routes
router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', validateTask, (req, res) => {
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: sanitizeHtml(req.body.title),
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/:id', validateId, (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

router.delete('/:id', validateId, (req, res) => {
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