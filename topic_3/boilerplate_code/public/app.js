const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = 'http://localhost:3000/api/tasks';

// Fetch tasks from the server
async function fetchTasks() {
    // Prompt Copilot: Fetch tasks from the API and render them
}

// Render tasks to the DOM
function renderTasks(tasks) {
    // Prompt Copilot: Create list items for each task with toggle and delete functionality
}

// Add a new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Prompt Copilot: Send a POST request to add a new task
    fetchTasks();
});
