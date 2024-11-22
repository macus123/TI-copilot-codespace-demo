const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

/* 
This is the main server file for the project. 
It sets up the Express server, configures middleware for CORS and body parsing, serves static files, and defines the routes for the tasks API.

Key Functions:
Configures CORS to allow cross-origin requests.
Serves static files from the public directory.
Uses the tasksRouter for handling API requests.
Starts the server on port 3000.

As the server is hosted on Codespaces, the CORS middleware configuration should be set to allow requests from all origins (*) during development.
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
*/
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/tasks', tasksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
