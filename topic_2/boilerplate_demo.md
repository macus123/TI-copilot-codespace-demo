index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebApp Boilerplate</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

styles.css
#app {
    text-align: center;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
script.js
document.getElementById('myButton').addEventListener('click', function() {
    alert('Button was clicked!');
});

This setup includes a basic HTML structure, some simple CSS for styling, and a JavaScript file that adds an event listener to a button.

run the below command in terminal to install the tool to setup the web-browser to preview html code:
npm i -g http-server 
Next, you have to run the server, type http-server in the same terminal.
You can click Open in Browser and see the result there, if your index.html file is at the root of your project it will be opened by default or else you'll need to write the correct path in the URL bar.
Click on topic_2
http://127.0.0.1:8080
Ctrl + C to stop the server in the terminal