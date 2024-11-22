/*
This file contains the frontend JavaScript code for interacting with the tasks API. 
It handles fetching tasks from the server, rendering them in the DOM, and adding event listeners for creating, updating, and deleting tasks.

Key Functions:
fetchTasks(): Fetch tasks from the server and render them.
renderTasks(tasks): Render tasks to the DOM.
Event listeners for form submission and task actions (toggle and delete).
*/

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();

    document.querySelector('#task-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskInput = document.querySelector('#task-input');
        const task = { title: taskInput.value, completed: false };
        await createTask(task);
        taskInput.value = '';
        fetchTasks();
    });
});

async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function renderTasks(tasks) {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.title;
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.addEventListener('click', () => toggleTask(task));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(task);
        });
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

async function createTask(task) {
    try {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
    } catch (error) {
        console.error('Error creating task:', error);
    }
}

async function toggleTask(task) {
    try {
        task.completed = !task.completed;
        await fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        fetchTasks();
    } catch (error) {
        console.error('Error toggling task:', error);
    }
}

async function deleteTask(task) {
    try {
        await fetch(`/api/tasks/${task.id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}