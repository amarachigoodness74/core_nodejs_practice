# Steps to run projects in this directory:

## 1. http_client

This is a simple http client that logs google.com web page content.  
To run: `npm run run-http-client`

## 2. http_server

This is a simple http server that waits for request on http://127.0.0.1:3000.  
To run: `npm run run-http-server`

## 3. eventEmmiter

This is a practice project to understand how event emmiter works
To run: `npm run run-events`

## 4. modules

This is a simple custom http server and client practice.  
To run: `npm run run-module`

## 5. json-file-reader

This is a simple json file reader that logs file content to the console  
To run: `run-parser`

## 6. todo_api

This is a simple nodejs Todo API that listens for request on http://localhost:5005  
To run:

- cd into the project folder
- Run `node server`
On any HTTP client, for example Postman, you can run the following: 
- To Create a todo item: `POST http://localhost:5005/api/todos` -
- To View all todo items: `GET http://localhost:5005/api/todos`
- To View a todo item: `GET http://localhost:5005/api/todos/{id}` eg: http://localhost:5005/api/todos/1
- To Update a todo item: `PUT http://localhost:5005/api/todos/{id}` eg: http://localhost:5005/api/todos/1
- To Delete a todo item: `DELETE http://localhost:5005/api/todos/{id}` eg: http://localhost:5005/api/todos/1
