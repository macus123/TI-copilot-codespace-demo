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