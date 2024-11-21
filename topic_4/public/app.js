const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const API_URL = window.location.origin + '/api/tasks';

// Fetch tasks from the server
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        console.log('Fetched tasks:', tasks); // Debug log
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks to the DOM
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.title;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const toggleButton = document.createElement('button');
        toggleButton.className = 'toggle-btn';
        toggleButton.innerHTML = task.completed ? 
            '<i class="fas fa-undo"></i>' : 
            '<i class="fas fa-check"></i>';
        toggleButton.addEventListener('click', async () => {
            try {
                await fetch(`${API_URL}/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ completed: !task.completed })
                });
                fetchTasks();
            } catch (error) {
                console.error('Error toggling task:', error);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', async () => {
            try {
                await fetch(`${API_URL}/${task.id}`, {
                    method: 'DELETE'
                });
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        });

        actionsDiv.appendChild(toggleButton);
        actionsDiv.appendChild(deleteButton);
        li.appendChild(taskText);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
    });
}

// Add a new task
// In app.js, modify the submit event listener:
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        try {
            console.log('Sending task:', taskTitle); // Debug log
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: taskTitle, completed: false })
            });
            console.log('Response:', await response.clone().json()); // Debug log
            taskInput.value = '';
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

// Add error handling utility
const handleApiError = (error, message) => {
    console.error(message, error);
    // Add user-friendly error notification here
};

// Update fetch wrapper with security headers
const secureFetch = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                // Add any auth headers here
                ...options.headers,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response;
    } catch (error) {
        handleApiError(error, 'API request failed');
        throw error;
    }
};

// Initial fetch of tasks
fetchTasks();

