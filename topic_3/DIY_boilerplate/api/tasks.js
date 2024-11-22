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