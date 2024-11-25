const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const API_URL = window.location.origin + '/api/tasks';

// Fetch tasks from the server
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
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
        toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
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
        deleteButton.textContent = 'Delete';
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
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: taskTitle, completed: false })
            });
            taskInput.value = '';
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
});

// Initial fetch of tasks
fetchTasks();